import { describe, it, expect } from 'vitest';
import {
  SEARCH_QUERY_PARAM,
  parseSearchQueryParam,
  withSearchQueryParam,
} from './searchQueryUrl';

describe('searchQueryUrl', () => {
  it('parses scalar and array query values', () => {
    expect(parseSearchQueryParam(undefined)).toBe('');
    expect(parseSearchQueryParam('mastodon')).toBe('mastodon');
    expect(parseSearchQueryParam(['a', 'b'])).toBe('a');
    expect(parseSearchQueryParam([])).toBe('');
  });

  it('sets or removes q while preserving other keys', () => {
    expect(withSearchQueryParam({ app: 'x' }, '  hi  ')).toEqual({ app: 'x', q: 'hi' });
    expect(withSearchQueryParam({ app: 'x', q: 'old' }, '   ')).toEqual({ app: 'x' });
    expect(SEARCH_QUERY_PARAM).toBe('q');
  });
});
