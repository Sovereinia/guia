/** True for absolute http(s) URLs (treat as leaving the app). */
export function isExternalHttpUrl(href: string | undefined | null): boolean {
  if (!href) return false;
  return /^https?:\/\//i.test(href.trim());
}

/**
 * Safe attributes for outbound anchors.
 * Same-origin / relative links keep default tab behavior.
 */
export function externalLinkAttrs(href: string | undefined | null): {
  target?: '_blank';
  rel?: string;
} {
  if (!isExternalHttpUrl(href)) return {};
  return { target: '_blank', rel: 'noopener noreferrer' };
}
