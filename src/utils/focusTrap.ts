const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Visible, non-disabled focusable elements within a root (dialog/modal). */
export function getFocusableElements(root: ParentNode | null | undefined): HTMLElement[] {
  if (!root) return [];
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  return nodes.filter((el) => {
    if (el.hasAttribute('disabled') || el.getAttribute('aria-hidden') === 'true') return false;
    const style = typeof window !== 'undefined' ? window.getComputedStyle(el) : null;
    if (style && (style.visibility === 'hidden' || style.display === 'none')) return false;
    return true;
  });
}

/**
 * Keep Tab / Shift+Tab cycling inside `root`. Returns true if the event was handled.
 * Pure positioning logic is unit-tested via next focus index helper.
 */
export function focusTrapIndex(length: number, currentIndex: number, shiftKey: boolean): number {
  if (length <= 0) return -1;
  if (currentIndex < 0) return shiftKey ? length - 1 : 0;
  if (shiftKey) return currentIndex <= 0 ? length - 1 : currentIndex - 1;
  return currentIndex >= length - 1 ? 0 : currentIndex + 1;
}

/** Apply focus trap for a Tab keydown on the given container. */
export function trapTabKey(root: HTMLElement | null | undefined, event: KeyboardEvent): boolean {
  if (!root || event.key !== 'Tab') return false;
  const focusables = getFocusableElements(root);
  if (focusables.length === 0) return false;

  const active = document.activeElement as HTMLElement | null;
  let currentIndex = active ? focusables.indexOf(active) : -1;
  // Focus may be inside a nested node not in the list (e.g. contenteditable child)
  if (currentIndex < 0 && active && root.contains(active)) {
    currentIndex = event.shiftKey ? 0 : focusables.length - 1;
  }

  const nextIndex = focusTrapIndex(focusables.length, currentIndex, event.shiftKey);
  if (nextIndex < 0) return false;

  const atEdge =
    (event.shiftKey && (currentIndex <= 0 || !root.contains(active))) ||
    (!event.shiftKey && (currentIndex < 0 || currentIndex >= focusables.length - 1));

  if (!atEdge && currentIndex >= 0) return false;

  event.preventDefault();
  focusables[nextIndex]?.focus();
  return true;
}
