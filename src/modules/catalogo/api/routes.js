import { Router } from 'express';

export function buildCatalogoRouter({ listProducts }) {
  const router = Router();

  router.get('/catalogo/produtos', async (req, res) => {
    const { q, page, pageSize } = req.query;
    res.json(await listProducts({ q, page, pageSize }));
  });

  return router;
}
