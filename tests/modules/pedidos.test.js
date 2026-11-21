import { describe, test } from 'node:test';

describe('pedidos', () => {
  describe('createOrderFromCart', () => {
    test('calcula o total a partir de qty * unitPrice', { todo: true });
    test('copia unit_price para order_items', { todo: true });
  });

  describe('markOrderPaid', () => {
    test('muda PENDING para PAID', { todo: true });
    test('não permite pagar pedido CANCELLED', { todo: true });
  });
});
