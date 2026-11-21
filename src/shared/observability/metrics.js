import client from 'prom-client';

// Registry próprio (evita conflito global em testes que criam vários apps).
export function createMetrics() {
  const registry = new client.Registry();
  client.collectDefaultMetrics({ register: registry });

  const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total de requisições HTTP',
    labelNames: ['method', 'route', 'status_code'],
    registers: [registry],
  });

  const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duração das requisições HTTP em segundos',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5],
    registers: [registry],
  });

  // Usa o padrão da rota (/v1/carrinho/items/:itemId) e não a URL real, para não explodir a cardinalidade.
  function middleware(req, res, next) {
    const end = httpRequestDuration.startTimer();
    res.on('finish', () => {
      // O Express limpa req.baseUrl ao sair do sub-router, por isso usamos o valor capturado por captureBaseUrl.
      const route = req.route ? `${res.locals.metricsBaseUrl ?? req.baseUrl}${req.route.path}` : 'unmatched';
      const labels = { method: req.method, route, status_code: res.statusCode };
      httpRequestsTotal.inc(labels);
      end(labels);
    });
    next();
  }

  async function handler(_req, res) {
    res.set('Content-Type', registry.contentType);
    res.send(await registry.metrics());
  }

  // Usar no início de cada router montado com prefixo (ex.: /v1).
  function captureBaseUrl(req, res, next) {
    res.locals.metricsBaseUrl = req.baseUrl;
    next();
  }

  return { registry, middleware, handler, captureBaseUrl };
}
