import { describe, it, expect } from 'vitest';
import { MAIN_CONTENT_ID, mainContentHref } from './skipLink';

describe('skipLink', () => {
  it('exposes stable main id and hash href', () => {
    expect(MAIN_CONTENT_ID).toBe('main-content');
    expect(mainContentHref()).toBe('#main-content');
    expect(mainContentHref('custom')).toBe('#custom');
  });
});
