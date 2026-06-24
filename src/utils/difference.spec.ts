import { describe, expect, it } from 'vitest';
import { difference } from './difference';

describe('difference', () => {
  it('returns items only in first list', () => {
    expect(difference([1, 2, 3], [2])).toEqual([1, 3]);
    expect(difference(['a', 'b'], ['b', 'c'])).toEqual(['a']);
  });

  it('handles empty and full overlap', () => {
    expect(difference([], [1])).toEqual([]);
    expect(difference([1, 2], [])).toEqual([1, 2]);
    expect(difference([1, 2], [1, 2, 3])).toEqual([]);
  });
});
