// Módulo dono: usuarios
export async function up(knex) {
  await knex.schema.createTable('users', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.text('email').notNullable().unique();
    t.text('password_hash').notNullable();
    t.text('role').notNullable().defaultTo('customer');
    t.timestamps(true, true);
    t.check("role in ('customer', 'admin')", [], 'users_role_check');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}
