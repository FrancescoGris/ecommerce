import 'dotenv/config';

const base = {
  client: 'pg',
  connection:
    process.env.DATABASE_URL ?? 'postgres://ecommerce:ecommerce@localhost:5432/ecommerce',
  pool: { min: 0, max: 10 },
  migrations: { directory: './db/migrations', tableName: 'knex_migrations', loadExtensions: ['.js'] },
  seeds: { directory: './db/seeds', loadExtensions: ['.js'] },
};

export default {
  development: base,
  test: base,
  production: { ...base, pool: { min: 2, max: 20 } },
};
