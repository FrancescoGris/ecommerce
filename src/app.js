import express from 'express';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';

import { requestId } from './shared/observability/requestId.js';
import { createMetrics } from './shared/observability/metrics.js';
import { healthRouter } from './shared/observability/health.js';
import { errorHandler, notFoundHandler } from './shared/http/errors.js';

import { createUsuariosModule } from './modules/usuarios/index.js';
import { createCatalogoModule } from './modules/catalogo/index.js';
import { createPedidosModule } from './modules/pedidos/index.js';
import { createCarrinhoModule } from './modules/carrinho/index.js';
import { createPagamentoModule } from './modules/pagamento/index.js';

// Composition root: único lugar onde os módulos são criados e ligados entre si.
export function createApp({ db, logger }) {
  const app = express();
  const metrics = createMetrics();

  // --- infraestrutura transversal ---
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(requestId());
  app.use(pinoHttp({ logger, genReqId: (req) => req.id }));
  app.use(metrics.middleware);
  app.use(express.json({ limit: '100kb' }));

  // --- observabilidade ---
  app.use(healthRouter({ db }));
  app.get('/metrics', metrics.handler);

  // --- módulos (ordem = ordem de dependência) ---
  const usuarios = createUsuariosModule({ db });
  const catalogo = createCatalogoModule({ db });
  const pedidos = createPedidosModule({ db });
  const carrinho = createCarrinhoModule({
    db,
    usuarios: usuarios.publicApi,
    catalogo: catalogo.publicApi,
    pedidos: pedidos.publicApi,
  });
  const pagamento = createPagamentoModule({
    db,
    usuarios: usuarios.publicApi,
    pedidos: pedidos.publicApi,
  });

  const v1 = express.Router();
  v1.use(metrics.captureBaseUrl);
  for (const mod of [usuarios, catalogo, pedidos, carrinho, pagamento]) v1.use(mod.router);
  app.use('/v1', v1);

  // --- erros ---
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
