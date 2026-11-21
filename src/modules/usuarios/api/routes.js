import { Router } from 'express';

export function buildUsuariosRouter({ signup, login }) {
  const router = Router();

  router.post('/usuarios/signup', async (req, res) => {
    const user = await signup(req.body ?? {});
    res.status(201).json(user);
  });

  router.post('/usuarios/login', async (req, res) => {
    const result = await login(req.body ?? {});
    res.json(result);
  });

  return router;
}
