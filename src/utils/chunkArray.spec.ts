import { describe, expect, it } from 'vitest';
import { chunkArray } from './chunkArray';

describe('chunkArray', () => {
  it('chunks evenly and with remainder', () => {
    expect(chunkArray([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('handles empty and clamps size', () => {
    expect(chunkArray([], 3)).toEqual([]);
    expect(chunkArray([1, 2], 0)).toEqual([[1], [2]]);
    expect(chunkArray(['a', 'b', 'c'], 1)).toEqual([['a'], ['b'], ['c']]);
  });
});
