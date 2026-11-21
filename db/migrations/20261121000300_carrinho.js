// Módulo dono: carrinho
export async function up(knex) {
  await knex.schema.createTable('carts', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('user_id').notNullable().unique().references('id').inTable('users').onDelete('CASCADE');
    t.timestamps(true, true);
  });

  await knex.schema.createTable('cart_items', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('cart_id').notNullable().references('id').inTable('carts').onDelete('CASCADE');
    t.uuid('product_id').notNullable().references('id').inTable('products');
    t.integer('qty').notNullable();
    t.decimal('unit_price', 12, 2).notNullable();
    t.unique(['cart_id', 'product_id']);
    t.check('qty > 0', [], 'cart_items_qty_check');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('cart_items');
  await knex.schema.dropTableIfExists('carts');
}
