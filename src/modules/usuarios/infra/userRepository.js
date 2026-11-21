import { NotImplementedError } from '../../../shared/http/errors.js';

// Único lugar que lê/escreve a tabela `users`.
export function makeUserRepository(db) {
  return {
    async findByEmail(email) {
      throw new NotImplementedError('userRepository.findByEmail');
    },
    async findById(id) {
      throw new NotImplementedError('userRepository.findById');
    },
    async create({ email, passwordHash, role }) {
      throw new NotImplementedError('userRepository.create');
    },
  };
}
