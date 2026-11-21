# 04 — C4 Nível 2: Containers

Abre a caixa "Sistema E-commerce" e mostra o que é implantado/executado separadamente.

```mermaid
C4Container
    title Containers — Sistema E-commerce

    Person(cliente, "Cliente", "Web / App")

    System_Boundary(ecom, "Sistema E-commerce") {
        Container(api, "API Monolítica", "Node.js 20+ / Express 5", "Expõe /v1/*, contém os 5 módulos e a observabilidade embutida (pino, request-id, /health, /metrics)")
        ContainerDb(db, "Banco de Dados", "PostgreSQL 16 (Docker)", "users, products, carts, cart_items, orders, order_items, payments")
    }

    System_Ext(pagamento, "Provedor de Pagamento", "Simulado")
    System_Ext(prometheus, "Prometheus / Grafana", "Coleta de métricas (opcional)")

    Rel(cliente, api, "Chama a API", "HTTPS/JSON")
    Rel(api, db, "Lê e grava", "SQL (Knex / pg)")
    Rel(api, pagamento, "Autoriza pagamento", "Interface PaymentProvider")
    Rel(prometheus, api, "Coleta métricas", "GET /metrics")
```

## Containers
| Container | Tecnologia | Observações |
|-----------|-----------|-------------|
| **API/Backend Monolítico** | Node.js + Express 5 | Um único processo e um único deploy. Os módulos ficam em `src/modules/*`. |
| **PostgreSQL** | Postgres 16 em Docker (`docker-compose.yml`) | Migrations em `db/migrations`, seeds em `db/seeds`. |
| **Observabilidade embutida** | pino + pino-http, prom-client | Não é container separado: roda dentro da API. Logs JSON no stdout, `x-request-id`, `GET /health/live`, `GET /health/ready`, `GET /metrics`. |

> Texto: `Cliente → [API Express (módulos + pino + /metrics)] → [Postgres (Docker)]`; `API → Pagamento (simulado)`; `Prometheus → GET /metrics`.
