# 02 — Requisitos

## Funcionais (RF)
| ID | Módulo | Requisito |
|----|--------|-----------|
| RF01 | usuarios | Cadastrar usuário com e-mail e senha (`POST /v1/usuarios/signup`). |
| RF02 | usuarios | Autenticar e devolver um token de acesso (`POST /v1/usuarios/login`). |
| RF03 | catalogo | Listar produtos com paginação e busca por nome/SKU (`GET /v1/catalogo/produtos`). |
| RF04 | carrinho | Adicionar item ao carrinho do usuário logado (`POST /v1/carrinho/items`). |
| RF05 | carrinho | Remover item do carrinho (`DELETE /v1/carrinho/items/{itemId}`). |
| RF06 | carrinho/checkout | Gerar pedido a partir do carrinho, validando estoque e congelando o preço unitário (`POST /v1/checkout`). |
| RF07 | pedidos | Registrar pedido com status `PENDING` → `PAID` / `CANCELLED`. |
| RF08 | pagamento | Processar pagamento simulado de um pedido e atualizar o status (`POST /v1/pagamentos`). |
| RF09 | catalogo (admin) | *(futuro)* CRUD de produtos restrito ao papel `admin`. |
| RF10 | notificações | *(futuro)* Enviar e-mail de confirmação de pedido/pagamento. |

## Não-funcionais (RNF)
- **Arquitetura:** monólito modular em Node.js + Express; camadas `api → app → domain → infra` por módulo.
- **Persistência:** PostgreSQL 16 (Docker), migrations e seeds versionados (Knex).
- **Desempenho:** p95 < 300 ms em leituras; payload JSON limitado a 100 kB.
- **Consistência:** checkout e pagamento executados em transação (estoque, pedido e itens gravados juntos ou nada).
- **Portabilidade:** sobe com `docker compose` + `npm scripts`; configuração por variáveis de ambiente (`.env`).
- **Manutenibilidade:** módulos só se comunicam pela API pública; testes por módulo em `tests/`.
- **Versionamento de API:** prefixo `/v1`.

## Segurança
- Senhas armazenadas apenas como hash **bcrypt** (`password_hash`), nunca em texto puro.
- Autenticação via **JWT** (Bearer token) com expiração curta; rotas de carrinho, checkout e pagamento exigem login.
- Autorização por papel (`customer`, `admin`).
- Validação de entrada em todas as rotas (tipos, limites, `qty > 0`).
- Cabeçalhos de segurança com **helmet**; `x-powered-by` desabilitado.
- Preço e total sempre calculados no servidor — o cliente nunca envia preço.
- Segredos só via variáveis de ambiente; `.env` fora do Git.
- *(futuro)* Rate limiting em `/login` e `/signup`.

## Observabilidade
- **Request-ID:** cada requisição recebe um `x-request-id` (reaproveita o do cliente, se vier) que aparece em todos os logs e na resposta.
- **Logs estruturados** em JSON com **pino** / **pino-http** (método, rota, status, duração, request-id).
- **Healthcheck:**
  - `GET /health/live` → processo está de pé.
  - `GET /health/ready` → banco respondendo (`select 1`); retorna 503 se não.
- **Métricas Prometheus** em `GET /metrics` (prom-client): métricas padrão do Node + `http_requests_total` e `http_request_duration_seconds` por método/rota/status.
- **Erros padronizados:** `{ error: { code, message, requestId } }`, facilitando rastrear um erro do cliente até o log.
