import { describe, expect, it } from 'vitest';
import { needsTruncation, truncateText } from './truncateText';

describe('truncateText', () => {
  it('leaves short strings and truncates long ones', () => {
    expect(truncateText('hello', 10)).toBe('hello');
    expect(truncateText('hello world', 8)).toBe('hello w…');
    expect(truncateText('abc', 0)).toBe('');
  });
});

describe('needsTruncation', () => {
  it('detects when limit is exceeded', () => {
    expect(needsTruncation('abcd', 3)).toBe(true);
    expect(needsTruncation('ab', 3)).toBe(false);
  });
});
