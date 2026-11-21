# E-commerce — Monólito Modular

Esqueleto de um monólito modular para e-commerce em **Node.js + Express 5 + PostgreSQL**, com documentação arquitetural mínima (Visão, Requisitos, C4, ADRs, OpenAPI, Modelo de Dados).

Módulos: `catalogo` · `carrinho`/`checkout` · `pagamento` · `usuarios` · `pedidos`.

> Status: **esqueleto**. Rotas e use cases existem, mas respondem `501 NOT_IMPLEMENTED`. A observabilidade (request-id, logs, health, métricas) já funciona.

## Documentação

| # | Documento |
|---|-----------|
| 01 | [Visão do produto](docs/01-visao-produto.md) |
| 02 | [Requisitos](docs/02-requisitos.md) |
| 03 | [C4 — Contexto](docs/03-c4-contexto.md) |
| 04 | [C4 — Containers](docs/04-c4-container.md) |
| 05 | [C4 — Componentes](docs/05-c4-componentes.md) |
| 06 | [Modelo de dados](docs/06-modelo-dados.md) |
| 07 | [Contratos da API (OpenAPI)](docs/07-contratos-api.yaml) |
| ADR-001 | [Monólito modular](docs/adrs/ADR-001-monolito-modular.md) |
| ADR-002 | [Banco Postgres](docs/adrs/ADR-002-banco-postgres.md) |

Os diagramas estão em Mermaid e renderizam direto no GitHub.

## Como rodar

Pré-requisitos: Node.js 20.6+ e Docker.

```bash
cp .env.example .env      # no Windows: copy .env.example .env
npm install
npm run setup             # sobe o Postgres, roda migrations e seed
npm run dev               # API em http://localhost:3000
npm test
```

### Scripts

| Script | O que faz |
|--------|-----------|
| `npm run db:up` / `db:down` | Sobe / derruba o Postgres (docker-compose) |
| `npm run migrate` | Aplica as migrations |
| `npm run migrate:rollback` | Desfaz todas as migrations |
| `npm run seed` | Popula dados de exemplo (2 usuários, 5 produtos) |
| `npm run db:reset` | rollback + migrate + seed |
| `npm run setup` | db:up + espera o banco + migrate + seed |
| `npm run dev` | API com reload automático (`node --watch`) |
| `npm start` | API em modo normal |
| `npm test` | Testes (`node:test`) |

Usuários do seed: `admin@loja.dev / admin1234` e `cliente@loja.dev / cliente1234`.

## Endpoints

| Método | Rota | Módulo |
|--------|------|--------|
| GET | `/health/live` · `/health/ready` | observabilidade |
| GET | `/metrics` | observabilidade (Prometheus) |
| GET | `/v1/catalogo/produtos` | catalogo |
| POST | `/v1/carrinho/items` | carrinho 🔒 |
| DELETE | `/v1/carrinho/items/{itemId}` | carrinho 🔒 |
| POST | `/v1/checkout` | carrinho 🔒 |
| POST | `/v1/pagamentos` | pagamento 🔒 |
| POST | `/v1/usuarios/signup` · `/v1/usuarios/login` | usuarios |

🔒 = exige `Authorization: Bearer <token>`.

## Estrutura

```
├── db/
│   ├── migrations/          # uma migration por módulo
│   └── seeds/
├── docs/                    # 01..07 + adrs/
├── scripts/wait-for-db.js
├── src/
│   ├── app.js               # composition root (liga os módulos)
│   ├── server.js            # sobe o HTTP + shutdown gracioso
│   ├── config/env.js
│   ├── shared/
│   │   ├── db.js · logger.js
│   │   ├── http/errors.js
│   │   └── observability/   # requestId · metrics · health
│   └── modules/
│       └── <modulo>/
│           ├── index.js     # API pública (única coisa que outros módulos importam)
│           ├── api/         # rotas Express
│           ├── app/         # use cases
│           ├── domain/      # entidades e regras puras
│           └── infra/       # repositórios Knex, provider de pagamento
├── tests/
│   ├── observabilidade.test.js
│   └── modules/*.test.js    # testes vazios (todo) por módulo
├── docker-compose.yml
└── knexfile.js
```

## Regras do monólito modular
1. Módulo só importa o `index.js` de outro módulo.
2. `domain/` não importa Express, Knex nem outro módulo.
3. Cada tabela tem um módulo dono — só ele escreve nela.
4. Sem dependência circular entre módulos.

Detalhes em [ADR-001](docs/adrs/ADR-001-monolito-modular.md).
