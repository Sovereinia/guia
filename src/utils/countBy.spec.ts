import { describe, expect, it } from 'vitest';
import { countBy, countWhere } from './countBy';

describe('countBy', () => {
  it('tallies keys', () => {
    const m = countBy(['a', 'b', 'a'], (s) => s);
    expect(m.get('a')).toBe(2);
    expect(m.get('b')).toBe(1);
  });
});

describe('countWhere', () => {
  it('counts predicate hits', () => {
    expect(countWhere([1, 2, 3, 4], (n) => n > 2)).toBe(2);
  });
});
