import { NotImplementedError } from '../../../shared/http/errors.js';

// TODO: validar e-mail/senha, checar duplicidade, gerar hash, salvar, devolver toPublicUser(user).
export function makeSignup({ userRepository, passwordHasher }) {
  return async function signup({ email, password }) {
    throw new NotImplementedError('usuarios.signup');
  };
}
