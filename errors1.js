// Advanced error handling utilities (retries, circuit breaker, causes, serialization)

// 1. Extended custom errors with `cause` support
class AppError extends Error {
    constructor(message, { code = 'APP_ERROR', cause = null, meta = {} } = {}) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        if (cause) this.cause = cause; // ES2022-aware
        this.meta = meta;
        Error.captureStackTrace?.(this, this.constructor);
    }
}

class TransientError extends AppError {
    constructor(message, opts = {}) { super(message, { code: 'TRANSIENT', ...opts }); }
}
class PermanentError extends AppError {
    constructor(message, opts = {}) { super(message, { code: 'PERMANENT', ...opts }); }
}

// 2. Safe serializer (for logs / telemetry)
function serializeError(err) {
    if (!err) return null;
    const simple = {
        name: err.name,
        message: err.message,
        code: err.code,
        stack: err.stack,
        meta: err.meta,
        cause: err.cause ? serializeError(err.cause) : undefined
    };
    // remove undefined fields
    Object.keys(simple).forEach(k => simple[k] === undefined && delete simple[k]);
    return simple;
}

// 3. Retry utility with exponential backoff + jitter
async function retry(fn, { retries = 3, baseDelay = 100, maxDelay = 2000, jitter = true, onRetry } = {}) {
    let attempt = 0;
    while (true) {
        try {
            return await fn(attempt);
        } catch (err) {
            attempt++;
            const transient = err instanceof TransientError || err.code === 'TRANSIENT';
            if (!transient || attempt > retries) {
                // wrap and propagate
                throw new AppError('Operation failed after retries', { cause: err, meta: { attempt } });
            }
            const backoff = Math.min(maxDelay, baseDelay * 2 ** (attempt - 1));
            const delay = jitter ? Math.round(backoff * (0.5 + Math.random() * 0.5)) : backoff;
            onRetry?.({ attempt, delay, err });
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

// 4. Simple circuit breaker
class CircuitBreaker {
    constructor(action, { threshold = 5, windowMs = 60000, cooldownMs = 30000 } = {}) {
        this.action = action;
        this.threshold = threshold;
        this.windowMs = windowMs;
        this.cooldownMs = cooldownMs;
        this.failures = [];
        this.openUntil = 0;
    }

    _recordFailure() {
        const now = Date.now();
        this.failures.push(now);
        // prune old
        this.failures = this.failures.filter(t => t > now - this.windowMs);
        if (this.failures.length >= this.threshold) this.openUntil = now + this.cooldownMs;
    }

    async call(...args) {
        const now = Date.now();
        if (now < this.openUntil) {
            throw new AppError('Circuit open', { code: 'CIRCUIT_OPEN', meta: { openUntil: this.openUntil } });
        }
        try {
            const res = await this.action(...args);
            // success: reset failures
            this.failures = [];
            return res;
        } catch (err) {
            this._recordFailure();
            throw err;
        }
    }
}

// 5. Wrapper: safeExecute - catches, logs and returns unified result
async function safeExecute(fn, { log = console.error, context = {} } = {}) {
    try {
        const result = await fn();
        return { ok: true, result };
    } catch (err) {
        const serialized = serializeError(err);
        log('ERROR', { at: new Date().toISOString(), context, error: serialized });
        return { ok: false, error: serialized };
    }
}

// 6. Aggregate errors example usage
async function parallelTasks(tasks) {
    const results = await Promise.allSettled(tasks.map(t => t()));
    const errors = results.filter(r => r.status === 'rejected').map(r => r.reason);
    if (errors.length) throw new AggregateError(errors, 'One or more tasks failed');
    return results.map(r => r.value);
}

// 7. Global handlers (Node.js) - safe fallback logging
if (typeof process !== 'undefined' && process?.on) {
    process.on('unhandledRejection', (reason) => {
        console.error('UNHANDLED_REJECTION', serializeError(reason instanceof Error ? reason : new Error(String(reason))));
    });
    process.on('uncaughtException', (err) => {
        console.error('UNCAUGHT_EXCEPTION', serializeError(err));
        // optionally graceful shutdown:
        // process.exit(1);
    });
}

// 8. Examples / tests
async function example() {
    // action that fails transiently
    let failFirst = true;
    const unreliable = async () => {
        if (failFirst) {
            failFirst = false;
            throw new TransientError('Temporary network issue');
        }
        return 'ok';
    };

    const cb = new CircuitBreaker(unreliable, { threshold: 2, windowMs: 10000, cooldownMs: 5000 });

    // retry with logging
    const res = await safeExecute(() => retry(() => cb.call(), {
        retries: 4,
        baseDelay: 100,
        onRetry: ({ attempt, delay, err }) => {
            console.warn(`Retry ${attempt} in ${delay}ms:`, err.message);
        }
    }), { context: { op: 'unreliable-call' } });

    console.log('Result:', res);

    // parallel tasks with AggregateError
    const tasks = [
        async () => 1,
        async () => { throw new PermanentError('Broken'); },
        async () => 3
    ];
    const agg = await safeExecute(() => parallelTasks(tasks), { context: { op: 'parallelTasks' } });
    console.log('parallel result:', agg);
}

// run example when executed directly
if (require?.main === module) {
    example().catch(err => {
        console.error('fatal', serializeError(err));
        process.exit(1);
    });
}