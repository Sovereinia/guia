import { describe, expect, it } from 'vitest';
import { setHasAll, toggleInSet } from './toggleInSet';

describe('toggleInSet', () => {
  it('adds and removes immutably', () => {
    const a = new Set(['x']);
    const b = toggleInSet(a, 'y');
    expect([...b].sort()).toEqual(['x', 'y']);
    expect(a.has('y')).toBe(false);
    const c = toggleInSet(b, 'x');
    expect([...c]).toEqual(['y']);
  });
});

describe('setHasAll', () => {
  it('checks membership of all values', () => {
    const s = new Set([1, 2, 3]);
    expect(setHasAll(s, [1, 3])).toBe(true);
    expect(setHasAll(s, [1, 4])).toBe(false);
  });
});
