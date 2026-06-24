import { describe, it, expect } from 'vitest';
import { externalLinkAttrs, isExternalHttpUrl } from './externalLink';

describe('externalLink', () => {
  it('detects absolute http(s) urls', () => {
    expect(isExternalHttpUrl('https://sovereinia.org/')).toBe(true);
    expect(isExternalHttpUrl('http://example.com')).toBe(true);
    expect(isExternalHttpUrl('/guia/')).toBe(false);
    expect(isExternalHttpUrl(null)).toBe(false);
  });

  it('sets target+rel only for external urls', () => {
    expect(externalLinkAttrs('https://a.com')).toEqual({
      target: '_blank',
      rel: 'noopener noreferrer',
    });
    expect(externalLinkAttrs('/local')).toEqual({});
  });
});
