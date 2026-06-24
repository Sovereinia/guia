import { describe, expect, it } from 'vitest';
import { union } from './union';

describe('union', () => {
  it('merges with first-seen uniqueness', () => {
    expect(union([1, 2], [2, 3])).toEqual([1, 2, 3]);
    expect(union(['a', 'a'], ['b'])).toEqual(['a', 'b']);
  });

  it('handles empty sides', () => {
    expect(union([], [1])).toEqual([1]);
    expect(union([1], [])).toEqual([1]);
    expect(union([], [])).toEqual([]);
  });
});
