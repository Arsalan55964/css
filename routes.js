// Advanced Promise utilities + simple Express routes example

// Utilities
const delay = (ms) => new Promise(res => setTimeout(res, ms));

class TransientError extends Error { constructor(msg){ super(msg); this.code = 'TRANSIENT'; } }
class ValidationError extends Error { constructor(msg, field){ super(msg); this.name='ValidationError'; this.field = field; } }

const timeout = (p, ms, message = 'Timed out') =>
  Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(message)), ms))]);

// Abort-capable runner: fn receives AbortSignal
const runWithAbort = (fn, ms) => {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), ms);
  return Promise.resolve()
    .then(() => fn(ac.signal))
    .finally(() => clearTimeout(timer));
};

// Retry with exponential backoff + jitter
async function retry(fn, { retries = 3, base = 100, max = 2000, onRetry } = {}) {
  let attempt = 0;
  while (true) {
    try { return await fn(); }
    catch (err) {
      attempt++;
      const isTransient = err && (err.code === 'TRANSIENT' || err instanceof TransientError);
      if (!isTransient || attempt > retries) throw err;
      const backoff = Math.min(max, base * 2 ** (attempt - 1));
      const delayMs = Math.round(backoff * (0.5 + Math.random() * 0.5));
      onRetry?.({ attempt, err, delayMs });
      await delay(delayMs);
    }
  }
}

// Simple concurrency limiter (p-limit)
function pLimit(concurrency = 5) {
  const queue = [];
  let active = 0;
  const next = () => {
    if (queue.length === 0 || active >= concurrency) return;
    active++;
    const { fn, resolve, reject } = queue.shift();
    Promise.resolve().then(() => fn()).then(resolve, reject).finally(() => {
      active--; next();
    });
  };
  return (fn) => new Promise((resolve, reject) => {
    queue.push({ fn, resolve, reject });
    next();
  });
}

// promisify a node-style callback fn
function promisify(fn) {
  return (...args) => new Promise((resolve, reject) =>
    fn(...args, (err, res) => (err ? reject(err) : resolve(res))));
}

// sequential async map
async function mapSeries(arr, mapper) {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    out.push(await mapper(arr[i], i));
  }
  return out;
}

// Example: simulate fetchUser that respects AbortSignal and random transient failure
async function fetchUser(id, signal) {
  if (signal?.aborted) throw new Error('aborted');
  // simulate network + possible transient failure
  await delay(100 + Math.random() * 200);
  if (Math.random() < 0.25) throw new TransientError('network glitch');
  return { id, name: `User${id}` };
}

// Example usage (run in Node or browser with top-level await)
(async () => {
  // Fetch multiple users with concurrency limit + retry
  const ids = [1,2,3,4,5,6];
  const limit = pLimit(3);
  const tasks = ids.map(id => limit(() =>
    retry(() => runWithAbort(sig => fetchUser(id, sig), 800), {
      retries: 2,
      onRetry: ({ attempt, err }) => console.warn(`Retry ${attempt} for ${id}:`, err.message)
    })
  ));
  const results = await Promise.allSettled(tasks);
  console.log('users results:', results);

  // Sequential processing example
  const seq = await mapSeries([10,11,12], async (i) => {
    return await fetchUser(i);
  });
  console.log('sequential users:', seq);
})().catch(console.error);

// -------------------------
// Simple Express routes using above utilities
// -------------------------
/* To use: npm install express body-parser
   Save and run with Node. This block is minimal for demo. */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// async handler wrapper
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// GET /users?ids=1,2,3  -> concurrent fetch with limiter + per-request timeout
app.get('/users', asyncHandler(async (req, res) => {
  const ids = (req.query.ids || '').split(',').map(Number).filter(Boolean);
  const limit = pLimit(4);
  const fetches = ids.map(id => limit(() =>
    timeout(retry(() => runWithAbort(sig => fetchUser(id, sig), 1000), { retries: 2 }), 1500)
  ));
  const settled = await Promise.allSettled(fetches);
  const data = settled.map(s => s.status === 'fulfilled' ? s.value : { error: s.reason.message });
  res.json({ data });
}));
