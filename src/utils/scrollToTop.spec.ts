import { describe, it, expect } from 'vitest';
import { SCROLL_TOP_THRESHOLD_PX, shouldShowScrollToTop } from './scrollToTop';

describe('scrollToTop', () => {
  it('hides below threshold and shows at/above', () => {
    expect(shouldShowScrollToTop(0)).toBe(false);
    expect(shouldShowScrollToTop(SCROLL_TOP_THRESHOLD_PX - 1)).toBe(false);
    expect(shouldShowScrollToTop(SCROLL_TOP_THRESHOLD_PX)).toBe(true);
    expect(shouldShowScrollToTop(900, 100)).toBe(true);
  });
});
