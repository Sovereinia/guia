import { describe, it, expect } from 'vitest';
import { isDarkTheme, nextTheme } from './theme';

describe('theme', () => {
  it('toggles light/dark', () => {
    expect(nextTheme('light')).toBe('dark');
    expect(nextTheme('dark')).toBe('light');
    expect(nextTheme('other')).toBe('dark');
  });

  it('detects dark', () => {
    expect(isDarkTheme('dark')).toBe(true);
    expect(isDarkTheme('light')).toBe(false);
  });
});
