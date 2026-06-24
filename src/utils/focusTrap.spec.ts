import { describe, it, expect } from 'vitest';
import { focusTrapIndex } from './focusTrap';

describe('focusTrapIndex', () => {
  it('wraps forward and backward', () => {
    expect(focusTrapIndex(3, 0, false)).toBe(1);
    expect(focusTrapIndex(3, 2, false)).toBe(0);
    expect(focusTrapIndex(3, 0, true)).toBe(2);
    expect(focusTrapIndex(3, 2, true)).toBe(1);
  });

  it('handles empty and unknown current', () => {
    expect(focusTrapIndex(0, 0, false)).toBe(-1);
    expect(focusTrapIndex(4, -1, false)).toBe(0);
    expect(focusTrapIndex(4, -1, true)).toBe(3);
  });
});
