import crypto from 'node:crypto';

export function createRandomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('base64url');
}
