import { describe, it, expect } from 'vitest';
import { isSupportedLocale, resolvePreferredLocale } from './localePreference';

describe('localePreference', () => {
  it('validates supported locales', () => {
    expect(isSupportedLocale('pt')).toBe(true);
    expect(isSupportedLocale('en')).toBe(true);
    expect(isSupportedLocale('es')).toBe(true);
    expect(isSupportedLocale('fr')).toBe(false);
    expect(isSupportedLocale(null)).toBe(false);
  });

  it('prefers saved, then browser, then fallback', () => {
    expect(resolvePreferredLocale('es', 'en-US', 'pt')).toBe('es');
    expect(resolvePreferredLocale(null, 'en-GB', 'pt')).toBe('en');
    expect(resolvePreferredLocale('nope', 'fr-FR', 'pt')).toBe('pt');
    expect(resolvePreferredLocale(null, null, 'en')).toBe('en');
  });
});
