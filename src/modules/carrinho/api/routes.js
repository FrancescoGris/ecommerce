import { Router } from 'express';

export function buildCarrinhoRouter({ requireAuth, addItem, removeItem, checkout }) {
  const router = Router();

  router.post('/carrinho/items', requireAuth, async (req, res) => {
    const { productId, qty } = req.body ?? {};
    const cart = await addItem({ userId: req.user.id, productId, qty });
    res.status(201).json(cart);
  });

  router.delete('/carrinho/items/:itemId', requireAuth, async (req, res) => {
    await removeItem({ userId: req.user.id, itemId: req.params.itemId });
    res.status(204).end();
  });

  router.post('/checkout', requireAuth, async (req, res) => {
    const order = await checkout({ userId: req.user.id });
    res.status(201).json(order);
  });

  return router;
}
