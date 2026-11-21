import { describe, test } from 'node:test';

describe('catalogo', () => {
  describe('listProducts', () => {
    test('lista produtos paginados', { todo: true });
    test('filtra por nome ou SKU com ?q=', { todo: true });
    test('limita pageSize a 100', { todo: true });
  });

  describe('getProductsByIds', () => {
    test('devolve só os produtos existentes', { todo: true });
  });
});
