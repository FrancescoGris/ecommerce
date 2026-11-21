// Espera o Postgres do docker-compose aceitar conexões antes de rodar as migrations.
import 'dotenv/config';
import pg from 'pg';

const url = process.env.DATABASE_URL ?? 'postgres://ecommerce:ecommerce@localhost:5432/ecommerce';
const maxAttempts = 30;

for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  const client = new pg.Client({ connectionString: url });
  try {
    await client.connect();
    await client.query('select 1');
    await client.end();
    console.log('Postgres pronto.');
    process.exit(0);
  } catch {
    await client.end().catch(() => {});
    console.log(`Aguardando Postgres... (${attempt}/${maxAttempts})`);
    await new Promise((r) => setTimeout(r, 1000));
  }
}
console.error('Postgres não respondeu a tempo.');
process.exit(1);
