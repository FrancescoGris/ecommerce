# ADR-002 — Banco de dados PostgreSQL

- **Status:** Aceito
- **Data:** 2026-11-21

## Contexto
O domínio é fortemente relacional (usuário → carrinho → itens → produtos; pedido → itens → pagamento) e operações como o checkout precisam ser atômicas: criar o pedido, copiar os itens e baixar o estoque juntos, ou nada.

## Decisão
Usar **PostgreSQL 16**, rodando em Docker (`docker-compose.yml`) no ambiente local, acessado via **Knex** (query builder + migrations + seeds).

## Motivos
- **Consistência relacional:** chaves estrangeiras, `UNIQUE` e `CHECK` (ex.: `stock >= 0`, `qty > 0`) garantem regras no próprio banco.
- **Transações ACID** com bloqueio de linha (`SELECT ... FOR UPDATE`) para evitar vender o mesmo estoque duas vezes.
- **Maturidade:** ampla adoção, documentação, ferramentas e suporte em qualquer cloud.
- **Flexibilidade:** `jsonb` para guardar o payload bruto do provedor de pagamento sem criar colunas para cada campo.
- `gen_random_uuid()` nativo para chaves UUID.

## Alternativas consideradas
- **MySQL:** também atenderia, mas `jsonb` e `CHECK` constraints são mais maduros no Postgres.
- **MongoDB:** modelo de documentos não ajuda num domínio com tantas relações e exigência de transações entre coleções.

## Consequências
- Time precisa conhecer SQL e migrations.
- Necessário Docker para rodar localmente.
- Todos os módulos compartilham o mesmo banco: a regra de "módulo dono da tabela" (ADR-001) evita acoplamento pelos dados. No futuro, cada módulo pode ter seu próprio *schema* Postgres.
