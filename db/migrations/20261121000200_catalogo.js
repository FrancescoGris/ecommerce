// Módulo dono: catalogo
export async function up(knex) {
  await knex.schema.createTable('products', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.text('name').notNullable();
    t.text('sku').notNullable().unique();
    t.decimal('price', 12, 2).notNullable();
    t.integer('stock').notNullable().defaultTo(0);
    t.timestamps(true, true);
    t.check('price >= 0', [], 'products_price_check');
    t.check('stock >= 0', [], 'products_stock_check');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('products');
}
