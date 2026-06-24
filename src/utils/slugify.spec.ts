import { describe, expect, it } from 'vitest';
import { isSlug, slugify } from './slugify';

describe('slugify', () => {
  it('normalizes text to hyphen slugs', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('  Foo--Bar!! ')).toBe('foo-bar');
    expect(slugify('Café')).toBe('cafe');
  });
});

describe('isSlug', () => {
  it('validates simple slugs', () => {
    expect(isSlug('hello-world')).toBe(true);
    expect(isSlug('Hello')).toBe(false);
    expect(isSlug('-x')).toBe(false);
  });
});
