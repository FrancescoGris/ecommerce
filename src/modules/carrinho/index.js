// API pública do módulo `carrinho` (inclui o checkout).
// Depende das APIs públicas de: usuarios (requireAuth), catalogo e pedidos.
import { makeCartRepository } from './infra/cartRepository.js';
import { makeAddItem } from './app/addItem.js';
import { makeRemoveItem } from './app/removeItem.js';
import { makeCheckout } from './app/checkout.js';
import { buildCarrinhoRouter } from './api/routes.js';

export function createCarrinhoModule({ db, usuarios, catalogo, pedidos }) {
  const cartRepository = makeCartRepository(db);

  return {
    router: buildCarrinhoRouter({
      requireAuth: usuarios.requireAuth,
      addItem: makeAddItem({ cartRepository, catalogo }),
      removeItem: makeRemoveItem({ cartRepository }),
      checkout: makeCheckout({ db, cartRepository, catalogo, pedidos }),
    }),
    publicApi: {},
  };
}
