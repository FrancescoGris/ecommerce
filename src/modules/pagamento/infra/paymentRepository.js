import { NotImplementedError } from '../../../shared/http/errors.js';

// Único lugar que lê/escreve `payments`.
export function makePaymentRepository(db) {
  return {
    async create(trx, { orderId, provider, status, payload }) {
      throw new NotImplementedError('paymentRepository.create');
    },
    async findByOrderId(orderId) {
      throw new NotImplementedError('paymentRepository.findByOrderId');
    },
  };
}
