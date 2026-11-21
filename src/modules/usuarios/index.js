// API pública do módulo `usuarios`. Outros módulos importam SOMENTE este arquivo.
import { env } from '../../config/env.js';
import { makeUserRepository } from './infra/userRepository.js';
import { makePasswordHasher } from './infra/passwordHasher.js';
import { makeTokenService } from './infra/tokenService.js';
import { makeSignup } from './app/signup.js';
import { makeLogin } from './app/login.js';
import { makeVerifyToken } from './app/verifyToken.js';
import { makeRequireAuth } from './api/requireAuth.js';
import { buildUsuariosRouter } from './api/routes.js';

export function createUsuariosModule({ db }) {
  const userRepository = makeUserRepository(db);
  const passwordHasher = makePasswordHasher();
  const tokenService = makeTokenService({ secret: env.jwtSecret, expiresIn: env.jwtExpiresIn });

  const signup = makeSignup({ userRepository, passwordHasher });
  const login = makeLogin({ userRepository, passwordHasher, tokenService });
  const verifyToken = makeVerifyToken({ tokenService });

  return {
    router: buildUsuariosRouter({ signup, login }),
    publicApi: {
      requireAuth: makeRequireAuth({ verifyToken }),
    },
  };
}
