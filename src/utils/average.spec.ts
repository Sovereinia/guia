import { describe, expect, it } from 'vitest';
import { average } from './average';

describe('average', () => {
  it('computes mean of finite numbers', () => {
    expect(average([1, 2, 3])).toBe(2);
    expect(average([10, 20])).toBe(15);
  });

  it('skips non-finite and handles empty', () => {
    expect(average([])).toBe(0);
    expect(average([NaN, Infinity])).toBe(0);
    expect(average([1, NaN, 3])).toBe(2);
  });
});
