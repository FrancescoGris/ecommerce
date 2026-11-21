import { Router } from 'express';

// Ainda sem rotas públicas: o pedido nasce pelo POST /v1/checkout (módulo carrinho).
// Próximos passos: GET /pedidos (meus pedidos) e GET /pedidos/:orderId.
export function buildPedidosRouter() {
  return Router();
}
