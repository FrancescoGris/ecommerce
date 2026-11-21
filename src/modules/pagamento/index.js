// API pública do módulo `pagamento`.
// Depende das APIs públicas de: usuarios (requireAuth) e pedidos.
import { makePaymentRepository } from './infra/paymentRepository.js';
import { makeFakePaymentProvider } from './infra/fakePaymentProvider.js';
import { makePayOrder } from './app/payOrder.js';
import { buildPagamentoRouter } from './api/routes.js';

export function createPagamentoModule({ db, usuarios, pedidos }) {
  const paymentRepository = makePaymentRepository(db);
  const paymentProvider = makeFakePaymentProvider();

  return {
    router: buildPagamentoRouter({
      requireAuth: usuarios.requireAuth,
      payOrder: makePayOrder({ db, paymentRepository, paymentProvider, pedidos }),
    }),
    publicApi: {},
  };
}
