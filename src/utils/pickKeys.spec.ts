import { describe, expect, it } from 'vitest';
import { omitKeys, pickKeys } from './pickKeys';

describe('pickKeys', () => {
  it('selects only requested own keys', () => {
    expect(pickKeys({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });
});

describe('omitKeys', () => {
  it('removes listed keys', () => {
    expect(omitKeys({ a: 1, b: 2 }, ['b'])).toEqual({ a: 1 });
  });
});
