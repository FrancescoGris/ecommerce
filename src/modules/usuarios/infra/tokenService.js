import { NotImplementedError } from '../../../shared/http/errors.js';

// TODO: implementar com `jsonwebtoken` (npm i jsonwebtoken) usando env.jwtSecret / env.jwtExpiresIn.
export function makeTokenService({ secret, expiresIn }) {
  return {
    sign(payload) {
      throw new NotImplementedError('tokenService.sign');
    },
    verify(token) {
      throw new NotImplementedError('tokenService.verify');
    },
  };
}
