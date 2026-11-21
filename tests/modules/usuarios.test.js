import { describe, test } from 'node:test';

describe('usuarios', () => {
  describe('signup', () => {
    test('cria usuário com role customer e não devolve passwordHash', { todo: true });
    test('rejeita e-mail já cadastrado (409)', { todo: true });
    test('rejeita senha com menos de 8 caracteres (400)', { todo: true });
  });

  describe('login', () => {
    test('devolve accessToken com credenciais válidas', { todo: true });
    test('responde 401 com senha errada', { todo: true });
  });

  describe('requireAuth', () => {
    test('popula req.user com token válido', { todo: true });
    test('responde 401 com token expirado', { todo: true });
  });
});
