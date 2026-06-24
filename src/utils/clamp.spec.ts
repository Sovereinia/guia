import { describe, expect, it } from 'vitest';
import { clamp, clampIndex } from './clamp';

describe('clamp', () => {
  it('bounds and swaps min/max', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
    expect(clamp(3, 10, 0)).toBe(3);
    expect(clamp(NaN, 2, 4)).toBe(2);
  });
});

describe('clampIndex', () => {
  it('indexes into list length', () => {
    expect(clampIndex(2, 5)).toBe(2);
    expect(clampIndex(-3, 5)).toBe(0);
    expect(clampIndex(9, 5)).toBe(4);
    expect(clampIndex(1, 0)).toBe(0);
  });
});
