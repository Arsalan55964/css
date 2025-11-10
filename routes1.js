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

// GET /user/:id  -> single fetch with retry and abort
app.get('/user/:id', asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const user = await timeout(retry(() => runWithAbort(sig => fetchUser(id, sig), 800), { retries: 2 }), 1200);
  res.json(user);
}));

// POST /users -> validation + create (simulated)
app.post('/users', asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) throw new ValidationError('Invalid email', 'email');
  if (!name) throw new ValidationError('Missing name', 'name');
  // simulate DB write with retry for transient errors
  await retry(async () => {
    // simulate write
    if (Math.random() < 0.2) throw new TransientError('DB write transient');
    await delay(80);
  }, { retries: 3 });
  res.status(201).json({ id: Date.now(), email, name });
}));

// Error handler
app.use((err, req, res, next) => {
  const payload = { message: err.message };
  if (err instanceof ValidationError) payload.field = err.field;
  if (err.code) payload.code = err.code;
  console.error('ERROR', err);
  res.status(err instanceof ValidationError ? 400 : 500).json({ error: payload });
});

// Start server when run directly
if (require.main === module) {
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}