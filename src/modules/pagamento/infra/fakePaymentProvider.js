import { NotImplementedError } from '../../../shared/http/errors.js';

// Provedor simulado. Implementa a porta PaymentProvider (ver domain/payment.js).
// Trocar por um gateway real = criar outro arquivo com a mesma interface e mudar a injeção no index.js.
// TODO: devolver APPROVED por padrão, DECLINED quando simulate === 'decline', com um raw { transactionId, ... }.
export function makeFakePaymentProvider() {
  return {
    name: 'fake',
    async authorize({ orderId, amount, method, simulate }) {
      throw new NotImplementedError('fakePaymentProvider.authorize');
    },
  };
}
