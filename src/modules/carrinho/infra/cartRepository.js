import { NotImplementedError } from '../../../shared/http/errors.js';

// Único lugar que lê/escreve `carts` e `cart_items`.
export function makeCartRepository(db) {
  return {
    async findOrCreateByUserId(userId) {
      throw new NotImplementedError('cartRepository.findOrCreateByUserId');
    },
    async listItems(cartId) {
      throw new NotImplementedError('cartRepository.listItems');
    },
    async upsertItem({ cartId, productId, qty, unitPrice }) {
      throw new NotImplementedError('cartRepository.upsertItem');
    },
    async removeItem({ cartId, itemId }) {
      throw new NotImplementedError('cartRepository.removeItem');
    },
    async clear(trx, cartId) {
      throw new NotImplementedError('cartRepository.clear');
    },
  };
}
