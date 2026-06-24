import { describe, it, expect } from 'vitest';
import { allowDecorativeMotion, prefersReducedMotion } from './reducedMotion';

describe('reducedMotion', () => {
  it('detects media matches', () => {
    expect(prefersReducedMotion({ matches: true })).toBe(true);
    expect(prefersReducedMotion({ matches: false })).toBe(false);
    expect(prefersReducedMotion(null)).toBe(false);
  });

  it('disables decorative motion when reduced preferred', () => {
    expect(allowDecorativeMotion(true, false)).toBe(true);
    expect(allowDecorativeMotion(true, true)).toBe(false);
    expect(allowDecorativeMotion(false, false)).toBe(false);
  });
});
