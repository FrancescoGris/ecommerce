import { NotImplementedError } from '../../../shared/http/errors.js';

// TODO: validar qty (isValidQty), buscar produto via catalogo.getProductsByIds,
// criar carrinho se não existir, inserir/somar item com unitPrice atual do catálogo.
export function makeAddItem({ cartRepository, catalogo }) {
  return async function addItem({ userId, productId, qty }) {
    throw new NotImplementedError('carrinho.addItem');
  };
}
