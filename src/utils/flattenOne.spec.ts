import { describe, expect, it } from 'vitest';
import { flattenOne } from './flattenOne';

describe('flattenOne', () => {
  it('flattens one level', () => {
    expect(flattenOne([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
    expect(flattenOne([['a'], ['b', 'c']])).toEqual(['a', 'b', 'c']);
  });

  it('handles empty and flat input', () => {
    expect(flattenOne([])).toEqual([]);
    expect(flattenOne([1, 2])).toEqual([1, 2]);
  });
});
