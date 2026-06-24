import { describe, it, expect, beforeEach } from 'vitest';
import {
  exportStarredAsText,
  isAppStarred,
  listStarredApps,
  resolveStarredApps,
  toggleAppStar,
} from './starredApps';

beforeEach(() => {
  localStorage.clear();
});

describe('starredApps', () => {
  it('toggles and persists stars by app name', () => {
    expect(isAppStarred('Mastodon')).toBe(false);
    expect(toggleAppStar('Mastodon')).toBe(true);
    expect(isAppStarred('Mastodon')).toBe(true);
    expect(listStarredApps()).toContain('Mastodon');
    expect(toggleAppStar('Mastodon')).toBe(false);
    expect(isAppStarred('Mastodon')).toBe(false);
  });

  it('exportStarredAsText sorts and joins lines', () => {
    toggleAppStar('Zeta');
    toggleAppStar('Alpha');
    expect(exportStarredAsText()).toBe('Alpha\nZeta');
    expect(exportStarredAsText(['C', 'A', ''])).toBe('A\nC');
  });

  it('resolveStarredApps keeps catalog order for known names', () => {
    toggleAppStar('B');
    toggleAppStar('Missing');
    const catalog = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
    expect(resolveStarredApps(catalog).map((a) => a.name)).toEqual(['B']);
  });
});
