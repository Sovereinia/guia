import { describe, expect, it } from 'vitest';
import { isEditableTarget, shouldHandleGlobalShortcut } from './keyboardTarget';

function el(tag: string, attrs: Record<string, string> = {}): HTMLElement {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

describe('isEditableTarget', () => {
  it('detects input/textarea/select and contentEditable attr', () => {
    expect(isEditableTarget(el('INPUT'))).toBe(true);
    expect(isEditableTarget(el('TEXTAREA'))).toBe(true);
    expect(isEditableTarget(el('SELECT'))).toBe(true);
    expect(isEditableTarget(el('DIV', { contenteditable: 'true' }))).toBe(true);
    expect(isEditableTarget(el('BUTTON'))).toBe(false);
    expect(isEditableTarget(null)).toBe(false);
  });

  it('treats textbox/searchbox/combobox roles as editable', () => {
    expect(isEditableTarget(el('DIV', { role: 'textbox' }))).toBe(true);
    expect(isEditableTarget(el('DIV', { role: 'searchbox' }))).toBe(true);
    expect(isEditableTarget(el('DIV', { role: 'combobox' }))).toBe(true);
  });
});

describe('shouldHandleGlobalShortcut', () => {
  it('blocks ctrl/meta/alt and editable targets', () => {
    expect(
      shouldHandleGlobalShortcut({ target: el('BUTTON'), metaKey: false, ctrlKey: false, altKey: false }),
    ).toBe(true);
    expect(
      shouldHandleGlobalShortcut({ target: el('INPUT'), metaKey: false, ctrlKey: false, altKey: false }),
    ).toBe(false);
    expect(
      shouldHandleGlobalShortcut({ target: el('BUTTON'), metaKey: true, ctrlKey: false, altKey: false }),
    ).toBe(false);
  });
});
