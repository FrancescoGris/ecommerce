import { NotImplementedError } from '../../../shared/http/errors.js';

// Chamado pelo módulo pagamento quando o provedor aprova.
// TODO: validar canTransition(order.status, 'PAID') e atualizar.
export function makeMarkOrderPaid({ orderRepository }) {
  return async function markOrderPaid(trx, orderId) {
    throw new NotImplementedError('pedidos.markOrderPaid');
  };
}
