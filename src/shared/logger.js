import pino from 'pino';
import { env } from '../config/env.js';

// Logs estruturados em JSON. Em desenvolvimento, saída legível via pino-pretty.
export function createLogger(options = {}) {
  return pino({
    level: env.logLevel,
    base: { service: 'ecommerce-monolito' },
    redact: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.passwordHash'],
    ...(env.nodeEnv === 'development' && {
      transport: { target: 'pino-pretty', options: { translateTime: 'SYS:HH:MM:ss' } },
    }),
    ...options,
  });
}
