/** Element id for the primary page landmark used by the skip link. */
export const MAIN_CONTENT_ID = 'main-content';

/** Build the in-page href for the skip control. */
export function mainContentHref(id: string = MAIN_CONTENT_ID): string {
  return `#${id}`;
}

/** Focus main landmark after skip activation (a11y). */
export function focusMainContent(id: string = MAIN_CONTENT_ID): void {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: false });
}
