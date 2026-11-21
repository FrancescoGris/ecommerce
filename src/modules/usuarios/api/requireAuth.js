import { UnauthorizedError } from '../../../shared/http/errors.js';

// Middleware exportado na API pública do módulo para os outros módulos protegerem suas rotas.
export function makeRequireAuth({ verifyToken }) {
  return async function requireAuth(req, _res, next) {
    const [scheme, token] = (req.get('authorization') ?? '').split(' ');
    if (scheme !== 'Bearer' || !token) throw new UnauthorizedError();
    req.user = await verifyToken(token); // { id, role }
    next();
  };
}
