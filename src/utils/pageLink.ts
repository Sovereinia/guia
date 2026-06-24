/** Build an absolute URL for the current app location (shareable). */
export function buildPageLink(
  origin: string,
  pathname: string,
  search: string = '',
  hash: string = '',
): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const q = search && !search.startsWith('?') && search.length > 0 ? `?${search}` : search;
  const h = hash && !hash.startsWith('#') && hash.length > 0 ? `#${hash}` : hash;
  const base = origin.replace(/\/$/, '');
  return `${base}${path}${q || ''}${h || ''}`;
}

/** Prefer full href from Location-like; fallback to composed parts. */
export function currentPageLink(loc: {
  href?: string;
  origin?: string;
  pathname?: string;
  search?: string;
  hash?: string;
}): string {
  if (loc.href && /^https?:\/\//i.test(loc.href)) return loc.href.split('#')[0] + (loc.hash || '');
  return buildPageLink(loc.origin || '', loc.pathname || '/', loc.search || '', loc.hash || '');
}
