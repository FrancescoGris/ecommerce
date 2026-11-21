import pino from 'pino';
import { createApp } from '../../src/app.js';

// App com logger silencioso e um "db" falso, para testar sem Postgres.
export function createTestApp({ dbUp = true } = {}) {
  const db = {
    raw: async () => {
      if (!dbUp) throw new Error('db down');
      return { rows: [{ '?column?': 1 }] };
    },
  };
  return createApp({ db, logger: pino({ level: 'silent' }) });
}
