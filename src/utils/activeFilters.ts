import type { HomeFilterState } from '@/utils/homeFilters';

/** Stable keys for active home constraints (order is display priority). */
export type ActiveFilterKey =
  | 'search'
  | 'category'
  | 'useCase'
  | 'beginners'
  | 'federated'
  | 'starred';

export type ActiveFilterDescriptor = {
  key: ActiveFilterKey;
  /** Raw value for search/category/useCase when applicable. */
  value?: string;
};

/**
 * List active home filters in a stable order for summary chips / a11y live regions.
 * Pure: no i18n — caller maps keys/values to labels.
 */
export function describeActiveFilters(state: HomeFilterState): ActiveFilterDescriptor[] {
  const out: ActiveFilterDescriptor[] = [];
  const q = state.searchQuery.trim();
  if (q) out.push({ key: 'search', value: q });
  if (state.selectedCategory !== 'all') {
    out.push({ key: 'category', value: state.selectedCategory });
  }
  if (state.selectedUseCase !== 'all') {
    out.push({ key: 'useCase', value: state.selectedUseCase });
  }
  if (state.beginnersOnly) out.push({ key: 'beginners' });
  if (state.federatedOnly) out.push({ key: 'federated' });
  if (state.starredOnly) out.push({ key: 'starred' });
  return out;
}

/** Count of active constraints (shortcut for badges). */
export function countActiveFilters(state: HomeFilterState): number {
  return describeActiveFilters(state).length;
}
