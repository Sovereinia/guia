import { describe, expect, it } from 'vitest';
import { moveItem } from './moveItem';

describe('moveItem', () => {
  it('reorders immutably', () => {
    expect(moveItem(['a', 'b', 'c'], 0, 2)).toEqual(['b', 'c', 'a']);
    expect(moveItem(['a', 'b', 'c'], 2, 0)).toEqual(['c', 'a', 'b']);
    const src = [1, 2];
    const out = moveItem(src, 0, 1);
    expect(out).toEqual([2, 1]);
    expect(src).toEqual([1, 2]);
  });
});
