import knex from 'knex';
import knexConfig from '../../knexfile.js';
import { env } from '../config/env.js';

// Instância única do Knex. A conexão só é aberta na primeira query.
export function createDb() {
  const config = knexConfig[env.nodeEnv] ?? knexConfig.development;
  return knex(config);
}
