// Módulo dono: pedidos
export async function up(knex) {
  await knex.schema.createTable('orders', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('user_id').notNullable().references('id').inTable('users').index();
    t.decimal('total', 12, 2).notNullable();
    t.text('status').notNullable().defaultTo('PENDING');
    t.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    t.check("status in ('PENDING', 'PAID', 'CANCELLED')", [], 'orders_status_check');
    t.check('total >= 0', [], 'orders_total_check');
  });

  await knex.schema.createTable('order_items', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('order_id').notNullable().references('id').inTable('orders').onDelete('CASCADE');
    t.uuid('product_id').notNullable().references('id').inTable('products');
    t.integer('qty').notNullable();
    t.decimal('unit_price', 12, 2).notNullable();
    t.check('qty > 0', [], 'order_items_qty_check');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('order_items');
  await knex.schema.dropTableIfExists('orders');
}
