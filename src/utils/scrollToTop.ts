/** Show the control after the user scrolls past this many pixels. */
export const SCROLL_TOP_THRESHOLD_PX = 320;

export function shouldShowScrollToTop(
  scrollY: number,
  threshold: number = SCROLL_TOP_THRESHOLD_PX,
): boolean {
  return scrollY >= threshold;
}

export function scrollWindowToTop(behavior: ScrollBehavior = 'smooth'): void {
  if (typeof window === 'undefined') return;
  window.scrollTo({ top: 0, left: 0, behavior });
}
