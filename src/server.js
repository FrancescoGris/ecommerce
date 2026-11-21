import { env } from './config/env.js';
import { createLogger } from './shared/logger.js';
import { createDb } from './shared/db.js';
import { createApp } from './app.js';

const logger = createLogger();
const db = createDb();
const app = createApp({ db, logger });

const server = app.listen(env.port, () => {
  logger.info({ port: env.port, env: env.nodeEnv }, `API ouvindo em http://localhost:${env.port}`);
});

// Encerramento gracioso: para de aceitar conexões e fecha o pool do banco.
async function shutdown(signal) {
  logger.info({ signal }, 'encerrando...');
  server.close(async () => {
    await db.destroy();
    logger.info('encerrado');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
