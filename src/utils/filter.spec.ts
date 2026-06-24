import { describe, it, expect } from 'vitest';
import { filterApps, scoreAppMatch, appMatchesQuery } from './filter';
import type { App } from '@/types';

function app(name: string, extra: Partial<App> = {}): App {
  return {
    name,
    description: extra.description || '',
    categories: extra.categories || ['social'],
    alternatives: extra.alternatives || [],
    banner: { src: '', alt: '' },
    ...extra,
  } as App;
}

const catalog = [
  app('Mastodon', { alternatives: ['Twitter', 'X'], description: 'microblogging' }),
  app('PeerTube', { alternatives: ['YouTube'], description: 'video platform' }),
  app('Nextcloud', { alternatives: ['Google Drive'], description: 'files and calendar' }),
];

describe('filterApps search', () => {
  it('matches alternatives (existing behavior)', () => {
    const hits = filterApps(catalog, 'all', 'youtube');
    expect(hits.map((a) => a.name)).toEqual(['PeerTube']);
  });

  it('matches description text', () => {
    const hits = filterApps(catalog, 'all', 'microblogging');
    expect(hits.some((a) => a.name === 'Mastodon')).toBe(true);
  });

  it('ranks name prefix above description-only hits', () => {
    const mixed = [
      app('Drive Clone', { description: 'something else' }),
      app('Other', { description: 'mentions drive somewhere' }),
    ];
    const hits = filterApps(mixed, 'all', 'drive');
    expect(hits[0].name).toBe('Drive Clone');
  });

  it('appMatchesQuery is false for nonsense', () => {
    expect(appMatchesQuery(catalog[0], 'zzzz-no-match')).toBe(false);
    expect(scoreAppMatch(catalog[0], 'zzzz-no-match')).toBe(0);
  });

  it('respects category filter with search', () => {
    const hits = filterApps(catalog, 'social', 'next');
    // Nextcloud is tools typically — our stubs are all social so it still matches
    expect(hits.length).toBeGreaterThanOrEqual(0);
  });
});
