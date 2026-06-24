import { describe, it, expect } from 'vitest';
import { applyQuickFilters, isBeginnerApp, isFederatedApp } from './quickFilters';
import type { App } from '@/types';

function app(partial: Partial<App> & { name: string }): App {
  return {
    description: '',
    categories: [],
    ...partial,
  } as App;
}

describe('quickFilters', () => {
  it('detects beginners and federated flags', () => {
    expect(isBeginnerApp(app({ name: 'A', recommendedForBeginners: true }))).toBe(true);
    expect(isBeginnerApp(app({ name: 'B' }))).toBe(false);
    expect(isFederatedApp(app({ name: 'C', protocol: ['ActivityPub'] }))).toBe(true);
    expect(isFederatedApp(app({ name: 'D', categories: ['protocols'] }))).toBe(true);
    expect(isFederatedApp(app({ name: 'E', useCases: ['protocol'] }))).toBe(true);
    expect(isFederatedApp(app({ name: 'F', categories: ['social'] }))).toBe(false);
  });

  it('applyQuickFilters combines toggles', () => {
    const catalog = [
      app({ name: 'BegFed', recommendedForBeginners: true, protocol: ['AP'] }),
      app({ name: 'BegOnly', recommendedForBeginners: true }),
      app({ name: 'FedOnly', protocol: ['AP'] }),
      app({ name: 'Neither' }),
    ];
    expect(applyQuickFilters(catalog, { beginnersOnly: true }).map((a) => a.name)).toEqual([
      'BegFed',
      'BegOnly',
    ]);
    expect(applyQuickFilters(catalog, { federatedOnly: true }).map((a) => a.name)).toEqual([
      'BegFed',
      'FedOnly',
    ]);
    expect(
      applyQuickFilters(catalog, { beginnersOnly: true, federatedOnly: true }).map((a) => a.name),
    ).toEqual(['BegFed']);
  });
});
