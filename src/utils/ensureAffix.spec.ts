import { describe, expect, it } from 'vitest';
import { ensurePrefix, ensureSuffix } from './ensureAffix';

describe('ensurePrefix', () => {
  it('adds only when missing', () => {
    expect(ensurePrefix('guia', 'https://')).toBe('https://guia');
    expect(ensurePrefix('https://x', 'https://')).toBe('https://x');
  });
});

describe('ensureSuffix', () => {
  it('adds only when missing', () => {
    expect(ensureSuffix('file', '.json')).toBe('file.json');
    expect(ensureSuffix('a.json', '.json')).toBe('a.json');
  });
});
