import { describe, it, expect } from 'vitest';
import { nextShuffleTrigger } from './reshuffle';

describe('nextShuffleTrigger', () => {
  it('increments and treats non-finite as zero', () => {
    expect(nextShuffleTrigger(0)).toBe(1);
    expect(nextShuffleTrigger(4)).toBe(5);
    expect(nextShuffleTrigger(Number.NaN)).toBe(1);
  });
});
