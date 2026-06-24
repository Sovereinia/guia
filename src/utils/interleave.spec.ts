import { describe, expect, it } from 'vitest';
import { interleave } from './interleave';

describe('interleave', () => {
  it('merges alternating elements', () => {
    expect(interleave([1, 3], [2, 4])).toEqual([1, 2, 3, 4]);
    expect(interleave(['a'], ['b', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('handles empty sides', () => {
    expect(interleave([], [1])).toEqual([1]);
    expect(interleave([1], [])).toEqual([1]);
    expect(interleave([], [])).toEqual([]);
  });
});
