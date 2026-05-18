import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validateSearchQuery, validateSpotifyId } from '../src/utils/validation.js';

describe('validation utilities', () => {
  it('normalizes a search query', () => {
    assert.equal(validateSearchQuery('  daft   punk  '), 'daft punk');
  });

  it('rejects empty search queries', () => {
    assert.throws(() => validateSearchQuery('   '), /cannot be empty/i);
  });

  it('accepts Spotify-like ids', () => {
    assert.equal(validateSpotifyId('37i9dQZF1DXcBWIGoYBM5M'), '37i9dQZF1DXcBWIGoYBM5M');
  });
});
