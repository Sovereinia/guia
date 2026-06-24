import { describe, it, expect, beforeEach } from 'vitest';
import { isAppStarred, toggleAppStar, listStarredApps } from './starredApps';

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
});
