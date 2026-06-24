import { describe, it, expect } from 'vitest';
import { defaultHomeFilterState, hasActiveHomeFilters } from './homeFilters';

describe('homeFilters', () => {
  it('defaults are inactive', () => {
    expect(hasActiveHomeFilters(defaultHomeFilterState())).toBe(false);
  });

  it('detects any active constraint', () => {
    const base = defaultHomeFilterState();
    expect(hasActiveHomeFilters({ ...base, searchQuery: 'mast' })).toBe(true);
    expect(hasActiveHomeFilters({ ...base, selectedCategory: 'social' })).toBe(true);
    expect(hasActiveHomeFilters({ ...base, selectedUseCase: 'chat' })).toBe(true);
    expect(hasActiveHomeFilters({ ...base, beginnersOnly: true })).toBe(true);
    expect(hasActiveHomeFilters({ ...base, federatedOnly: true })).toBe(true);
  });
});
