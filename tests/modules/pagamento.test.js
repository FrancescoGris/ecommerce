import { describe, test } from 'node:test';

describe('pagamento', () => {
  describe('payOrder', () => {
    test('aprovado: grava payment APPROVED e marca pedido como PAID', { todo: true });
    test('recusado (simulate=decline): grava DECLINED e pedido continua PENDING', { todo: true });
    test('responde 409 se o pedido já foi pago', { todo: true });
    test('responde 404 se o pedido não existe ou é de outro usuário', { todo: true });
  });
});
