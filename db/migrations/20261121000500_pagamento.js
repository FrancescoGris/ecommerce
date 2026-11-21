// Módulo dono: pagamento
export async function up(knex) {
  await knex.schema.createTable('payments', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('order_id').notNullable().references('id').inTable('orders').index();
    t.text('provider').notNullable();
    t.text('status').notNullable().defaultTo('PENDING');
    t.jsonb('payload').notNullable().defaultTo('{}');
    t.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    t.check("status in ('PENDING', 'APPROVED', 'DECLINED')", [], 'payments_status_check');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('payments');
}
