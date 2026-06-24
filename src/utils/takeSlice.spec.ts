import { describe, expect, it } from 'vitest';
import { takeFirst, takeLast } from './takeSlice';

describe('takeSlice', () => {
  it('takeFirst returns leading slice', () => {
    expect(takeFirst([1, 2, 3, 4], 2)).toEqual([1, 2]);
    expect(takeFirst([1, 2], 5)).toEqual([1, 2]);
    expect(takeFirst([1], 0)).toEqual([]);
  });

  it('takeLast returns trailing slice', () => {
    expect(takeLast([1, 2, 3, 4], 2)).toEqual([3, 4]);
    expect(takeLast([1, 2], 5)).toEqual([1, 2]);
    expect(takeLast([1], 0)).toEqual([]);
  });
});
