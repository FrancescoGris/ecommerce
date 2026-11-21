import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createTestApp } from './helpers/testApp.js';

test('GET /health/live responde 200', async () => {
  const res = await request(createTestApp()).get('/health/live');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
});

test('GET /health/ready responde 503 quando o banco cai', async () => {
  const res = await request(createTestApp({ dbUp: false })).get('/health/ready');
  assert.equal(res.status, 503);
  assert.equal(res.body.checks.database, 'down');
});

test('toda resposta tem x-request-id e reaproveita o enviado pelo cliente', async () => {
  const app = createTestApp();
  const gerado = await request(app).get('/health/live');
  assert.ok(gerado.headers['x-request-id']);

  const enviado = await request(app).get('/health/live').set('x-request-id', 'abc-123');
  assert.equal(enviado.headers['x-request-id'], 'abc-123');
});

test('GET /metrics expõe métricas Prometheus', async () => {
  const app = createTestApp();
  await request(app).get('/health/live');
  await request(app).delete('/v1/carrinho/items/123');
  const res = await request(app).get('/metrics');
  assert.equal(res.status, 200);
  assert.match(res.text, /http_requests_total/);
  // usa o padrão da rota (com /v1 e :itemId), não a URL real
  assert.match(res.text, /route="\/v1\/carrinho\/items\/:itemId"/);
});

test('rotas de negócio ainda respondem 501 (esqueleto) com erro padronizado', async () => {
  const res = await request(createTestApp()).get('/v1/catalogo/produtos');
  assert.equal(res.status, 501);
  assert.equal(res.body.error.code, 'NOT_IMPLEMENTED');
  assert.ok(res.body.error.requestId);
});

test('rota protegida sem token responde 401', async () => {
  const res = await request(createTestApp()).post('/v1/checkout');
  assert.equal(res.status, 401);
});
