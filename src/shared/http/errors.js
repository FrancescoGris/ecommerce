export class AppError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export class NotImplementedError extends AppError {
  constructor(useCase) {
    super(501, 'NOT_IMPLEMENTED', `Use case "${useCase}" ainda não implementado`);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Token ausente ou inválido') {
    super(401, 'UNAUTHORIZED', message);
  }
}

export class ValidationError extends AppError {
  constructor(message) {
    super(400, 'VALIDATION_ERROR', message);
  }
}

export function notFoundHandler(req, _res, next) {
  next(new AppError(404, 'NOT_FOUND', `Rota ${req.method} ${req.originalUrl} não existe`));
}

// Formato único de erro: { error: { code, message, requestId } }
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  const status = err.status ?? 500;
  if (status >= 500 && status !== 501) req.log?.error({ err }, 'erro não tratado');

  res.status(status).json({
    error: {
      code: err.code ?? 'INTERNAL_ERROR',
      message: status === 500 ? 'Erro interno' : err.message,
      requestId: req.id,
    },
  });
}
