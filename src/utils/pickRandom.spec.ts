import { describe, it, expect } from 'vitest';
import { pickRandomItem } from './pickRandom';

describe('pickRandomItem', () => {
  it('returns undefined for empty list', () => {
    expect(pickRandomItem([])).toBeUndefined();
  });

  it('uses injected random for stable index', () => {
    const items = ['a', 'b', 'c'];
    expect(pickRandomItem(items, () => 0)).toBe('a');
    expect(pickRandomItem(items, () => 0.99)).toBe('c');
  });
});
