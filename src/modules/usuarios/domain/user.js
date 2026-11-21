// Domínio puro: sem Express, sem Knex.
export const ROLES = Object.freeze({ CUSTOMER: 'customer', ADMIN: 'admin' });

export const PASSWORD_MIN_LENGTH = 8;

/** @typedef {{ id: string, email: string, passwordHash: string, role: 'customer'|'admin' }} User */

// Nunca devolver o hash para fora do módulo.
export function toPublicUser(user) {
  return { id: user.id, email: user.email, role: user.role };
}
