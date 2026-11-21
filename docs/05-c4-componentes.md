# 05 — C4 Nível 3: Componentes

Abre o container "API Monolítica" e mostra os módulos e suas camadas.

## Visão geral dos módulos

```mermaid
flowchart LR
    cliente([Cliente])

    subgraph API["API Monolítica (Express)"]
        direction LR
        shared["shared<br/>logger · request-id · métricas · health · erros"]
        usuarios["usuarios<br/>signup · login · requireAuth"]
        catalogo["catalogo<br/>listar produtos"]
        carrinho["carrinho / checkout<br/>add item · remove item · checkout"]
        pedidos["pedidos<br/>criar pedido · marcar pago"]
        pagamento["pagamento<br/>pagar pedido (provider fake)"]
    end

    db[(PostgreSQL)]
    gw[[Provedor de Pagamento<br/>simulado]]

    cliente --> usuarios & catalogo & carrinho & pagamento
    carrinho -- "API pública" --> catalogo
    carrinho -- "API pública" --> pedidos
    carrinho -- "requireAuth" --> usuarios
    pagamento -- "API pública" --> pedidos
    pagamento --> gw
    usuarios & catalogo & carrinho & pedidos & pagamento --> db
```

**Regra de dependência entre módulos:** um módulo só importa o `index.js` (API pública) de outro módulo. Nunca `domain/` ou `infra/` de outro módulo. Não existe dependência circular:

```
usuarios   ← carrinho, pagamento (só o middleware requireAuth)
catalogo   ← carrinho
pedidos    ← carrinho (checkout), pagamento
```

## Camadas dentro de cada módulo

```mermaid
flowchart TB
    api["api/<br/>rotas Express: valida entrada, chama use case, devolve HTTP"]
    app["app/<br/>use cases: orquestram o fluxo (ex.: checkout)"]
    domain["domain/<br/>entidades e regras puras (ex.: qty > 0, total do pedido)"]
    infra["infra/<br/>repositórios Knex/Postgres, provider de pagamento"]

    api --> app --> domain
    app --> infra
    infra -. implementa a porta definida por .-> domain
```

| Camada | Pode depender de | Não pode |
|--------|------------------|----------|
| `api` | `app` | acessar o banco direto |
| `app` | `domain`, interfaces de repositório (injetadas) | conhecer Express (`req`/`res`) |
| `domain` | nada (JS puro) | importar Knex, Express ou outro módulo |
| `infra` | `domain`, Knex | conter regra de negócio |

## Componentes por módulo

| Módulo | api (rotas) | app (use cases) | domain | infra |
|--------|-------------|-----------------|--------|-------|
| `usuarios` | `POST /usuarios/signup`, `POST /usuarios/login` | `signup`, `login`, `verifyToken` | `User`, papéis | `userRepository`, `passwordHasher` (bcrypt) |
| `catalogo` | `GET /catalogo/produtos` | `listProducts`, `getProductsByIds` | `Product` | `productRepository` |
| `carrinho` | `POST /carrinho/items`, `DELETE /carrinho/items/:itemId`, `POST /checkout` | `addItem`, `removeItem`, `checkout` | `Cart`, `CartItem` | `cartRepository` |
| `pedidos` | — (por enquanto só API pública) | `createOrderFromCart`, `getOrder`, `markOrderPaid` | `Order`, `OrderItem`, status | `orderRepository` |
| `pagamento` | `POST /pagamentos` | `payOrder` | `Payment`, status | `paymentRepository`, `fakePaymentProvider` |

Composição: `src/app.js` cria cada módulo injetando `db` e as APIs públicas das dependências (injeção de dependência manual, sem framework).
