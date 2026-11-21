import { describe, test } from 'node:test';

describe('carrinho', () => {
  describe('addItem', () => {
    test('cria o carrinho na primeira adição', { todo: true });
    test('soma a quantidade se o produto já está no carrinho', { todo: true });
    test('usa o preço do catálogo, não o enviado pelo cliente', { todo: true });
    test('rejeita qty <= 0 (400)', { todo: true });
  });

  describe('removeItem', () => {
    test('remove item do próprio carrinho (204)', { todo: true });
    test('não remove item do carrinho de outro usuário (404)', { todo: true });
  });

  describe('checkout', () => {
    test('gera pedido PENDING e esvazia o carrinho', { todo: true });
    test('responde 409 com carrinho vazio', { todo: true });
    test('responde 409 com estoque insuficiente e não cria pedido (rollback)', { todo: true });
  });
});
