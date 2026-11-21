import { NotImplementedError } from '../../../shared/http/errors.js';

// TODO: garantir que o item pertence ao carrinho do usuário antes de remover (senão 404).
export function makeRemoveItem({ cartRepository }) {
  return async function removeItem({ userId, itemId }) {
    throw new NotImplementedError('carrinho.removeItem');
  };
}
