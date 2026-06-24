import { describe, expect, it } from 'vitest';
import { countActiveFilters, describeActiveFilters } from './activeFilters';
import { defaultHomeFilterState } from './homeFilters';

describe('describeActiveFilters', () => {
  it('returns empty when browsing all defaults', () => {
    expect(describeActiveFilters(defaultHomeFilterState())).toEqual([]);
    expect(countActiveFilters(defaultHomeFilterState())).toBe(0);
  });

  it('lists search, category, useCase, and toggles in stable order', () => {
    const state = {
      ...defaultHomeFilterState(),
      searchQuery: '  mastodon  ',
      selectedCategory: 'social',
      selectedUseCase: 'chat',
      beginnersOnly: true,
      federatedOnly: true,
      starredOnly: true,
    };
    expect(describeActiveFilters(state)).toEqual([
      { key: 'search', value: 'mastodon' },
      { key: 'category', value: 'social' },
      { key: 'useCase', value: 'chat' },
      { key: 'beginners' },
      { key: 'federated' },
      { key: 'starred' },
    ]);
    expect(countActiveFilters(state)).toBe(6);
  });

  it('ignores whitespace-only search', () => {
    const state = { ...defaultHomeFilterState(), searchQuery: '   ' };
    expect(describeActiveFilters(state)).toEqual([]);
  });
});
