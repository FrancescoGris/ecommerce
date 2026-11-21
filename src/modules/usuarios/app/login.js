import { NotImplementedError } from '../../../shared/http/errors.js';

// TODO: buscar por e-mail, comparar hash, emitir JWT { sub: user.id, role }.
export function makeLogin({ userRepository, passwordHasher, tokenService }) {
  return async function login({ email, password }) {
    throw new NotImplementedError('usuarios.login');
  };
}
