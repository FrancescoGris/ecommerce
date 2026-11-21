import { NotImplementedError } from '../../../shared/http/errors.js';

export function makeGetOrder({ orderRepository }) {
  return async function getOrder(orderId) {
    throw new NotImplementedError('pedidos.getOrder');
  };
}
