import { describe, expect, it } from 'vitest';
import { sumBy } from './sumBy';

describe('sumBy', () => {
  it('sums projected numbers', () => {
    expect(sumBy([{ n: 1 }, { n: 2 }, { n: 3 }], (x) => x.n)).toBe(6);
    expect(sumBy([10, 20], (n) => n / 2)).toBe(15);
  });

  it('handles empty and non-finite', () => {
    expect(sumBy([], () => 1)).toBe(0);
    expect(sumBy([1], () => NaN)).toBe(0);
    expect(sumBy([1], () => Infinity)).toBe(0);
  });
});
