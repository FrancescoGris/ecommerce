import { NotImplementedError } from '../../../shared/http/errors.js';

// Usado pelo módulo carrinho (preço atual e estoque) via API pública.
export function makeGetProductsByIds({ productRepository }) {
  return async function getProductsByIds(ids) {
    throw new NotImplementedError('catalogo.getProductsByIds');
  };
}
