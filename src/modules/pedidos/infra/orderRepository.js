import { NotImplementedError } from '../../../shared/http/errors.js';

// Único lugar que lê/escreve `orders` e `order_items`.
export function makeOrderRepository(db) {
  return {
    async create(trx, { userId, total, items }) {
      throw new NotImplementedError('orderRepository.create');
    },
    async findById(orderId) {
      throw new NotImplementedError('orderRepository.findById');
    },
    async updateStatus(trx, orderId, status) {
      throw new NotImplementedError('orderRepository.updateStatus');
    },
  };
}
