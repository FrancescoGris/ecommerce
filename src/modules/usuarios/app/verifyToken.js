import { NotImplementedError } from '../../../shared/http/errors.js';

// TODO: validar assinatura/expiração do JWT e devolver { id, role }.
export function makeVerifyToken({ tokenService }) {
  return async function verifyToken(token) {
    throw new NotImplementedError('usuarios.verifyToken');
  };
}
