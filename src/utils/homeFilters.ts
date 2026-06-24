export type HomeFilterState = {
  searchQuery: string;
  selectedCategory: string;
  selectedUseCase: string;
  beginnersOnly: boolean;
  federatedOnly: boolean;
  starredOnly?: boolean;
};

/** True when any home list constraint is active (not default browse-all). */
export function hasActiveHomeFilters(state: HomeFilterState): boolean {
  return (
    !!state.searchQuery.trim() ||
    state.selectedCategory !== 'all' ||
    state.selectedUseCase !== 'all' ||
    state.beginnersOnly ||
    state.federatedOnly ||
    !!state.starredOnly
  );
}

export function defaultHomeFilterState(): HomeFilterState {
  return {
    searchQuery: '',
    selectedCategory: 'all',
    selectedUseCase: 'all',
    beginnersOnly: false,
    federatedOnly: false,
    starredOnly: false,
  };
}

/** Keep apps whose name is in the starred set (order preserved from list). */
export function filterStarredOnly<T extends { name: string }>(
  list: T[],
  starredNames: Iterable<string>,
  enabled: boolean,
): T[] {
  if (!enabled) return list;
  const set = starredNames instanceof Set ? starredNames : new Set(starredNames);
  if (set.size === 0) return [];
  return list.filter((a) => set.has(a.name));
}
