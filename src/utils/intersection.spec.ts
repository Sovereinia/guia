import { describe, expect, it } from 'vitest';
import { intersection } from './intersection';

describe('intersection', () => {
  it('returns shared elements in first-list order', () => {
    expect(intersection([1, 2, 3], [2, 4])).toEqual([2]);
    expect(intersection(['a', 'b', 'c'], ['c', 'a'])).toEqual(['a', 'c']);
  });

  it('handles empty and no overlap', () => {
    expect(intersection([], [1])).toEqual([]);
    expect(intersection([1, 2], [])).toEqual([]);
    expect(intersection([1], [2])).toEqual([]);
  });
});
