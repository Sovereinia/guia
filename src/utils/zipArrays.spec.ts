import { describe, expect, it } from 'vitest';
import { interleave, zipArrays } from './zipArrays';

describe('zipArrays', () => {
  it('pairs up to shorter length', () => {
    expect(zipArrays([1, 2, 3], ['a', 'b'])).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });
});

describe('interleave', () => {
  it('alternates and appends remainder', () => {
    expect(interleave([1, 2], [10, 20, 30])).toEqual([1, 10, 2, 20, 30]);
  });
});
