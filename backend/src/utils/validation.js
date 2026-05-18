import { createHttpError } from './httpError.js';

export function validateSearchQuery(value) {
  if (typeof value !== 'string') {
    throw createHttpError(400, 'Search query is required.');
  }

  const query = value.trim().replace(/\s+/g, ' ');

  if (query.length < 1) {
    throw createHttpError(400, 'Search query cannot be empty.');
  }

  if (query.length > 100) {
    throw createHttpError(400, 'Search query must be 100 characters or less.');
  }

  return query;
}

export function validateSpotifyId(value, label = 'Spotify id') {
  if (typeof value !== 'string' || !/^[A-Za-z0-9]{10,80}$/.test(value)) {
    throw createHttpError(400, `${label} is invalid.`);
  }

  return value;
}
