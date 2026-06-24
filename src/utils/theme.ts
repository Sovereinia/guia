export type ThemeName = 'light' | 'dark';

export function nextTheme(current: string): ThemeName {
  return current === 'dark' ? 'light' : 'dark';
}

export function isDarkTheme(current: string): boolean {
  return current === 'dark';
}
