import { Router } from 'express';

export function healthRouter({ db }) {
  const router = Router();

  // Liveness: o processo está de pé?
  router.get('/health/live', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  // Readiness: consegue atender? (banco respondendo)
  router.get('/health/ready', async (req, res) => {
    try {
      await db.raw('select 1');
      res.json({ status: 'ok', checks: { database: 'up' } });
    } catch (err) {
      req.log?.warn({ err }, 'readiness falhou: banco indisponível');
      res.status(503).json({ status: 'error', checks: { database: 'down' } });
    }
  });

  return router;
}
