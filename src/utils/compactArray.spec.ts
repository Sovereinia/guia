import { describe, expect, it } from 'vitest';
import { compactArray, compactTruthy } from './compactArray';

describe('compactArray', () => {
  it('removes only nullish', () => {
    expect(compactArray([1, null, 0, undefined, 2])).toEqual([1, 0, 2]);
  });
});

describe('compactTruthy', () => {
  it('removes falsy', () => {
    expect(compactTruthy([1, 0, '', 2, false, 3])).toEqual([1, 2, 3]);
  });
});
