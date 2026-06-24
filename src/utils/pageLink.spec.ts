import { describe, it, expect } from 'vitest';
import { buildPageLink, currentPageLink } from './pageLink';

describe('pageLink', () => {
  it('composes origin path query hash', () => {
    expect(buildPageLink('https://sovereinia.org', '/guia/', '?q=x', '')).toBe(
      'https://sovereinia.org/guia/?q=x',
    );
    expect(buildPageLink('https://a.com/', 'guia', 'q=1', 'top')).toBe('https://a.com/guia?q=1#top');
  });

  it('currentPageLink uses href when absolute', () => {
    expect(currentPageLink({ href: 'https://ex.com/guia/?q=m', hash: '' })).toContain('q=m');
  });
});
