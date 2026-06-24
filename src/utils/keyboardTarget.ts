/** True when the event target is an editable field — global shortcuts should ignore these. */
export function isEditableTarget(target: EventTarget | null | undefined): boolean {
  if (!target || !(target instanceof Element)) return false;
  const el = target as HTMLElement;
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (el.isContentEditable || el.getAttribute('contenteditable') === 'true') return true;
  // role=textbox / combobox often behave as fields for shortcuts
  const role = el.getAttribute('role');
  if (role === 'textbox' || role === 'searchbox' || role === 'combobox') return true;
  return false;
}

/**
 * Whether a global key handler should run for this event.
 * Skips when modifier chords (except shift for letters) or editable focus.
 */
export function shouldHandleGlobalShortcut(
  event: Pick<KeyboardEvent, 'target' | 'metaKey' | 'ctrlKey' | 'altKey'>,
): boolean {
  if (event.metaKey || event.ctrlKey || event.altKey) return false;
  return !isEditableTarget(event.target);
}
