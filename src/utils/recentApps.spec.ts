import { describe, it, expect, beforeEach } from 'vitest';
import { pushRecentApp, listRecentApps, clearRecentApps, resolveRecentApps } from './recentApps';

beforeEach(() => {
  localStorage.clear();
});

describe('recentApps', () => {
  it('pushes newest first and dedupes', () => {
    pushRecentApp('Mastodon');
    pushRecentApp('PeerTube');
    pushRecentApp('Mastodon');
    expect(listRecentApps()).toEqual(['Mastodon', 'PeerTube']);
  });

  it('caps length and resolves against catalog', () => {
    for (let i = 0; i < 12; i++) pushRecentApp(`App${i}`);
    expect(listRecentApps().length).toBe(8);
    const catalog = [{ name: 'App11' }, { name: 'App10' }, { name: 'Gone' }];
    const resolved = resolveRecentApps(catalog);
    expect(resolved.map((a) => a.name)).toEqual(['App11', 'App10']);
  });

  it('clearRecentApps empties storage', () => {
    pushRecentApp('X');
    clearRecentApps();
    expect(listRecentApps()).toEqual([]);
  });
});
