import { NotImplementedError } from '../../../shared/http/errors.js';

// Único lugar que lê/escreve a tabela `products`.
export function makeProductRepository(db) {
  return {
    async findAll({ q, limit, offset }) {
      throw new NotImplementedError('productRepository.findAll');
    },
    async findByIds(ids) {
      throw new NotImplementedError('productRepository.findByIds');
    },
    // Recebe a transação (trx) do checkout para baixar estoque atomicamente.
    async decrementStock(trx, items) {
      throw new NotImplementedError('productRepository.decrementStock');
    },
  };
}
