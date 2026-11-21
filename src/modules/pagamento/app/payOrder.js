import { NotImplementedError } from '../../../shared/http/errors.js';

// Fluxo esperado:
//   1. pedidos.getOrder(orderId) → 404 se não existe, 409 se não está PENDING, 403 se não é do usuário
//   2. paymentProvider.authorize({ orderId, amount: order.total, method, simulate })
//   3. transação: paymentRepository.create(...) + (se APPROVED) pedidos.markOrderPaid(trx, orderId)
//   4. devolver o pagamento
export function makePayOrder({ db, paymentRepository, paymentProvider, pedidos }) {
  return async function payOrder({ userId, orderId, method, simulate }) {
    throw new NotImplementedError('pagamento.payOrder');
  };
}
