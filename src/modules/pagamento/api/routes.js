import { Router } from 'express';

export function buildPagamentoRouter({ requireAuth, payOrder }) {
  const router = Router();

  router.post('/pagamentos', requireAuth, async (req, res) => {
    const { orderId, method, simulate } = req.body ?? {};
    const payment = await payOrder({ userId: req.user.id, orderId, method, simulate });
    res.status(201).json(payment);
  });

  return router;
}
