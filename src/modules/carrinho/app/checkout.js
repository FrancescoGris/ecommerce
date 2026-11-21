import { NotImplementedError } from '../../../shared/http/errors.js';

// Fluxo esperado (tudo numa transação: db.transaction(async (trx) => { ... })):
//   1. carregar itens do carrinho do usuário (409 se vazio)
//   2. catalogo.getProductsByIds → conferir estoque e pegar preço atual (409 se faltar)
//   3. catalogo.decrementStock(trx, items)
//   4. pedidos.createOrderFromCart(trx, { userId, items })
//   5. cartRepository.clear(trx, cartId)
//   6. devolver o pedido criado
export function makeCheckout({ db, cartRepository, catalogo, pedidos }) {
  return async function checkout({ userId }) {
    throw new NotImplementedError('carrinho.checkout');
  };
}
