import { describe, expect, it } from 'vitest';
import { rotateArray } from './rotateArray';

describe('rotateArray', () => {
  it('rotates left and right immutably', () => {
    expect(rotateArray([1, 2, 3, 4], 1)).toEqual([2, 3, 4, 1]);
    expect(rotateArray([1, 2, 3, 4], -1)).toEqual([4, 1, 2, 3]);
    const src = ['a', 'b'];
    expect(rotateArray(src, 1)).toEqual(['b', 'a']);
    expect(src).toEqual(['a', 'b']);
  });

  it('handles empty and full-cycle offsets', () => {
    expect(rotateArray([], 3)).toEqual([]);
    expect(rotateArray([1, 2, 3], 3)).toEqual([1, 2, 3]);
    expect(rotateArray([1, 2, 3], 4)).toEqual([2, 3, 1]);
  });
});
