// API pública do módulo `catalogo`.
import { makeProductRepository } from './infra/productRepository.js';
import { makeListProducts } from './app/listProducts.js';
import { makeGetProductsByIds } from './app/getProductsByIds.js';
import { buildCatalogoRouter } from './api/routes.js';

export function createCatalogoModule({ db }) {
  const productRepository = makeProductRepository(db);
  const listProducts = makeListProducts({ productRepository });

  return {
    router: buildCatalogoRouter({ listProducts }),
    publicApi: {
      getProductsByIds: makeGetProductsByIds({ productRepository }),
      decrementStock: (trx, items) => productRepository.decrementStock(trx, items),
    },
  };
}
