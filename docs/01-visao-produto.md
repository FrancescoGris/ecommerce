# 01 — Visão do Produto

## Problema
Pequenos e médios lojistas precisam vender online sem depender de plataformas caras e engessadas. Falta um sistema próprio, simples de operar e de evoluir, que cubra o fluxo essencial: **ver produtos → montar carrinho → fechar pedido → pagar**.

## Público
- **Cliente final** (web/app): navega no catálogo, monta o carrinho, faz checkout e paga.
- **Administrador da loja**: cadastra produtos, controla estoque e acompanha pedidos.
- **Time de desenvolvimento**: precisa de uma base organizada, fácil de entender e de testar.

## Objetivos
1. Entregar o fluxo de compra ponta a ponta (catálogo, carrinho, checkout, pagamento simulado, pedidos).
2. Autenticação de usuários com papéis (`customer` / `admin`).
3. Código organizado como **monólito modular**, com fronteiras claras entre módulos, para permitir extrair serviços no futuro se for necessário.
4. Observabilidade desde o primeiro dia (logs estruturados, request-id, healthcheck, métricas).

## Critérios de sucesso
- Um cliente consegue se cadastrar, adicionar itens ao carrinho, gerar um pedido e pagá-lo (simulado) via API.
- O pedido nunca é criado com estoque insuficiente nem com preço diferente do catálogo no momento do checkout.
- Cada módulo só acessa outro módulo pela sua API pública (`index.js`) — nada de importar `infra` de outro módulo.
- Ambiente sobe com 1 comando (`npm run setup` + `npm run dev`) e os testes rodam com `npm test`.
- p95 de latência das rotas de leitura < 300 ms em ambiente local.
