import { describe, expect, it } from 'vitest';
import { capitalizeFirst } from './capitalizeFirst';

describe('capitalizeFirst', () => {
  it('uppercases leading char only', () => {
    expect(capitalizeFirst('hello')).toBe('Hello');
    expect(capitalizeFirst('Hello')).toBe('Hello');
    expect(capitalizeFirst('hELLO')).toBe('HELLO');
  });

  it('handles empty and single char', () => {
    expect(capitalizeFirst('')).toBe('');
    expect(capitalizeFirst('a')).toBe('A');
  });
});
