import { describe, it, expect } from 'vitest';
import { resolveEscapeAction } from './escapeAction';

describe('resolveEscapeAction', () => {
  it('prioritizes shortcuts, then modal, then clear filters', () => {
    expect(
      resolveEscapeAction({ shortcutsOpen: true, modalOpen: true, filtersActive: true }),
    ).toBe('close-shortcuts');
    expect(
      resolveEscapeAction({ shortcutsOpen: false, modalOpen: true, filtersActive: true }),
    ).toBe('ignore-modal');
    expect(
      resolveEscapeAction({ shortcutsOpen: false, modalOpen: false, filtersActive: true }),
    ).toBe('clear-filters');
    expect(
      resolveEscapeAction({ shortcutsOpen: false, modalOpen: false, filtersActive: false }),
    ).toBe('none');
  });
});
