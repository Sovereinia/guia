export const LOCALE_STORAGE_KEY = 'user-locale';
export const SUPPORTED_LOCALES = ['pt', 'en', 'es'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function isSupportedLocale(value: string | null | undefined): value is SupportedLocale {
  return !!value && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/** Prefer saved locale, then browser language prefix, then fallback. */
export function resolvePreferredLocale(
  saved: string | null | undefined,
  browserLang: string | null | undefined,
  fallback: SupportedLocale = 'pt',
): SupportedLocale {
  if (isSupportedLocale(saved)) return saved;
  const prefix = (browserLang || '').split('-')[0]?.toLowerCase();
  if (isSupportedLocale(prefix)) return prefix;
  return fallback;
}

export function readStoredLocale(): string | null {
  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeStoredLocale(locale: SupportedLocale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* private mode */
  }
}

/** Keep document language in sync for a11y / SEO. */
export function applyDocumentLang(locale: string): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('lang', locale);
}
