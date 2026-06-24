/** Query-string key for the home search box. */
export const SEARCH_QUERY_PARAM = 'q';

/** Normalize route query value (string | string[] | null/undefined) to a search string. */
export function parseSearchQueryParam(raw: unknown): string {
  if (raw == null) return '';
  if (Array.isArray(raw)) {
    const first = raw.find((x) => typeof x === 'string' && x.length > 0);
    return typeof first === 'string' ? first : '';
  }
  return typeof raw === 'string' ? raw : '';
}

/**
 * Build the next query object for the router: set `q` when non-empty, omit when empty.
 * Preserves unrelated keys (e.g. `app`).
 */
export function withSearchQueryParam(
  current: Record<string, unknown>,
  searchText: string,
  param: string = SEARCH_QUERY_PARAM,
): Record<string, unknown> {
  const next: Record<string, unknown> = { ...current };
  const trimmed = searchText.trim();
  if (trimmed) next[param] = trimmed;
  else delete next[param];
  return next;
}
