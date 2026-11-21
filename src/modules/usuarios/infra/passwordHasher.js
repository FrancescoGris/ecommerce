import bcrypt from 'bcryptjs';

export function makePasswordHasher({ rounds = 10 } = {}) {
  return {
    hash: (plain) => bcrypt.hash(plain, rounds),
    compare: (plain, hash) => bcrypt.compare(plain, hash),
  };
}
