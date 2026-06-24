import { describe, expect, it } from 'vitest';
import { arrayEquals } from './arrayEquals';

describe('arrayEquals', () => {
  it('compares length and elements', () => {
    expect(arrayEquals([1, 2], [1, 2])).toBe(true);
    expect(arrayEquals([1, 2], [1, 3])).toBe(false);
    expect(arrayEquals([1], [1, 2])).toBe(false);
    expect(arrayEquals([], [])).toBe(true);
  });

  it('treats NaN as equal (SameValueZero)', () => {
    expect(arrayEquals([NaN], [NaN])).toBe(true);
    const same = [1];
    expect(arrayEquals(same, same)).toBe(true);
  });
});
