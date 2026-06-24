export type HomeFilterState = {
  searchQuery: string;
  selectedCategory: string;
  selectedUseCase: string;
  beginnersOnly: boolean;
  federatedOnly: boolean;
};

/** True when any home list constraint is active (not default browse-all). */
export function hasActiveHomeFilters(state: HomeFilterState): boolean {
  return (
    !!state.searchQuery.trim() ||
    state.selectedCategory !== 'all' ||
    state.selectedUseCase !== 'all' ||
    state.beginnersOnly ||
    state.federatedOnly
  );
}

export function defaultHomeFilterState(): HomeFilterState {
  return {
    searchQuery: '',
    selectedCategory: 'all',
    selectedUseCase: 'all',
    beginnersOnly: false,
    federatedOnly: false,
  };
}
