import { describe, expect, it } from 'vitest';
import { isGuiaStorageKey, storageKey } from './storageKey';

describe('storageKey', () => {
  it('namespaces and sanitizes segments', () => {
    expect(storageKey('Recent', 'Apps')).toBe('guia:recent:apps');
    expect(storageKey('Foo Bar', 'x!!')).toBe('guia:foo-bar:x');
    expect(storageKey()).toBe('guia:default');
  });
});

describe('isGuiaStorageKey', () => {
  it('detects prefix', () => {
    expect(isGuiaStorageKey('guia:theme')).toBe(true);
    expect(isGuiaStorageKey('other')).toBe(false);
  });
});
