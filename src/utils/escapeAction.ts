export type EscapeUiState = {
  shortcutsOpen: boolean;
  modalOpen: boolean;
  filtersActive: boolean;
};

export type EscapeAction = 'close-shortcuts' | 'ignore-modal' | 'clear-filters' | 'none';

/** Decide what Escape should do on the home shell (modal owns its own Esc). */
export function resolveEscapeAction(state: EscapeUiState): EscapeAction {
  if (state.shortcutsOpen) return 'close-shortcuts';
  if (state.modalOpen) return 'ignore-modal';
  if (state.filtersActive) return 'clear-filters';
  return 'none';
}
