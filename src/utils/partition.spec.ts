import { describe, expect, it } from 'vitest';
import { partition } from './partition';

describe('partition', () => {
  it('splits by predicate keeping order', () => {
    const [evens, odds] = partition([1, 2, 3, 4], (n) => n % 2 === 0);
    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([1, 3]);
  });
});
