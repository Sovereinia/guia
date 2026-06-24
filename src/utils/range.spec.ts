import { describe, expect, it } from 'vitest';
import { indices, range } from './range';

describe('range', () => {
  it('builds ascending and descending inclusive ranges', () => {
    expect(range(1, 3)).toEqual([1, 2, 3]);
    expect(range(3, 1)).toEqual([3, 2, 1]);
    expect(range(2, 2)).toEqual([2]);
  });
});

describe('indices', () => {
  it('lists zero-based indices', () => {
    expect(indices(3)).toEqual([0, 1, 2]);
    expect(indices(0)).toEqual([]);
  });
});
