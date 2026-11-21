import bcrypt from 'bcryptjs';

// Dados de exemplo para desenvolvimento local.
// Usuários: admin@loja.dev / admin1234  ·  cliente@loja.dev / cliente1234
export async function seed(knex) {
  // limpa na ordem inversa das FKs
  await knex('payments').del();
  await knex('order_items').del();
  await knex('orders').del();
  await knex('cart_items').del();
  await knex('carts').del();
  await knex('products').del();
  await knex('users').del();

  await knex('users').insert([
    { email: 'admin@loja.dev', password_hash: await bcrypt.hash('admin1234', 10), role: 'admin' },
    { email: 'cliente@loja.dev', password_hash: await bcrypt.hash('cliente1234', 10), role: 'customer' },
  ]);

  await knex('products').insert([
    { name: 'Teclado mecânico ABNT2', sku: 'TEC-001', price: '249.90', stock: 15 },
    { name: 'Mouse sem fio', sku: 'MOU-001', price: '89.90', stock: 40 },
    { name: 'Monitor 24" Full HD', sku: 'MON-024', price: '799.00', stock: 8 },
    { name: 'Headset USB', sku: 'HEA-001', price: '159.90', stock: 20 },
    { name: 'Webcam 1080p', sku: 'WEB-001', price: '199.90', stock: 0 },
  ]);
}
