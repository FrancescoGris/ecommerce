import { NotImplementedError } from '../../../shared/http/errors.js';

// Chamado pelo checkout (módulo carrinho) DENTRO da transação dele.
// TODO: calcular total a partir de items (qty * unitPrice), inserir order + order_items com status PENDING.
export function makeCreateOrderFromCart({ orderRepository }) {
  return async function createOrderFromCart(trx, { userId, items }) {
    throw new NotImplementedError('pedidos.createOrderFromCart');
  };
}
