# ADR-001 — Monólito modular

- **Status:** Aceito
- **Data:** 2026-11-21

## Contexto
O e-commerce está começando, com um time pequeno e domínio ainda em descoberta (catálogo, carrinho/checkout, pagamento, usuários, pedidos). Microsserviços trariam custo operacional alto (vários deploys, rede entre serviços, consistência distribuída) antes de existir necessidade real de escalar partes separadamente.

## Decisão
Construir um **monólito modular**: uma única aplicação Express, um único deploy e um único banco, mas dividida em módulos por domínio (`src/modules/<modulo>`), cada um com as camadas `api → app → domain → infra`.

Regras para manter a modularidade forte:
1. Cada módulo expõe uma **API pública** em `index.js`; outros módulos só importam dali.
2. É proibido importar `domain/` ou `infra/` de outro módulo.
3. Cada tabela tem um **módulo dono**; só ele escreve nela.
4. Sem dependências circulares entre módulos (o grafo atual é: carrinho → catalogo, pedidos, usuarios; pagamento → pedidos, usuarios).
5. A composição (injeção de dependências) acontece num único lugar: `src/app.js`.

## Consequências
**Positivas**
- Simplicidade de desenvolvimento: um repositório, um `npm run dev`, debug local fácil.
- Deploy atômico: tudo sobe junto, sem versionar contratos entre serviços.
- Transações ACID simples (checkout grava pedido, itens e baixa de estoque numa transação).
- Alta coesão inicial: cada módulo agrupa o que muda junto.

**Negativas / riscos**
- Risco de o monólito **crescer demais** e virar "big ball of mud" se as fronteiras forem ignoradas.
- Escala é do sistema inteiro, não de um módulo isolado.
- Uma falha grave pode derrubar a aplicação toda.

**Mitigação (plano de modularidade forte)**
- Revisão de código checando as regras acima; futuramente, regra de lint (ex.: `eslint-plugin-boundaries` ou `dependency-cruiser`) para barrar imports proibidos.
- Testes por módulo (`tests/modules/*`).
- Se um módulo precisar escalar sozinho (ex.: `pagamento`), ele já tem fronteira e API pública definidas, o que facilita extraí-lo para um serviço.
