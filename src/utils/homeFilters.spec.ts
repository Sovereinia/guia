import { describe, it, expect } from 'vitest';
import {
  defaultHomeFilterState,
  filterStarredOnly,
  hasActiveHomeFilters,
} from './homeFilters';

describe('homeFilters', () => {
  it('defaults are inactive', () => {
    expect(hasActiveHomeFilters(defaultHomeFilterState())).toBe(false);
  });

  it('detects any active constraint including starredOnly', () => {
    const base = defaultHomeFilterState();
    expect(hasActiveHomeFilters({ ...base, searchQuery: 'mast' })).toBe(true);
    expect(hasActiveHomeFilters({ ...base, selectedCategory: 'social' })).toBe(true);
    expect(hasActiveHomeFilters({ ...base, selectedUseCase: 'chat' })).toBe(true);
    expect(hasActiveHomeFilters({ ...base, beginnersOnly: true })).toBe(true);
    expect(hasActiveHomeFilters({ ...base, federatedOnly: true })).toBe(true);
    expect(hasActiveHomeFilters({ ...base, starredOnly: true })).toBe(true);
  });

  it('filterStarredOnly keeps matching names only when enabled', () => {
    const list = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
    expect(filterStarredOnly(list, ['B'], false).map((a) => a.name)).toEqual(['A', 'B', 'C']);
    expect(filterStarredOnly(list, ['B', 'C'], true).map((a) => a.name)).toEqual(['B', 'C']);
    expect(filterStarredOnly(list, [], true)).toEqual([]);
  });
});
