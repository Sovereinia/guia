import { describe, expect, it } from 'vitest';
import { isBlank, isPresent, trimOrEmpty } from './isBlank';

describe('isBlank / isPresent', () => {
  it('treats whitespace as blank', () => {
    expect(isBlank('  ')).toBe(true);
    expect(isBlank('x')).toBe(false);
    expect(isPresent('x')).toBe(true);
    expect(isPresent(null)).toBe(false);
  });
});

describe('trimOrEmpty', () => {
  it('trims and defaults nullish', () => {
    expect(trimOrEmpty('  a  ')).toBe('a');
    expect(trimOrEmpty(undefined)).toBe('');
  });
});
