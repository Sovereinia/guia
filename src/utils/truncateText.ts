/** Truncate `text` to at most `maxLen` chars, appending `ellipsis` when shortened. */
export function truncateText(text: string, maxLen: number, ellipsis = '…'): string {
  const s = text ?? '';
  if (!Number.isFinite(maxLen) || maxLen <= 0) return '';
  if (s.length <= maxLen) return s;
  const cut = Math.max(0, maxLen - ellipsis.length);
  return s.slice(0, cut) + ellipsis;
}

/** True when truncation would change the string for the given limit. */
export function needsTruncation(text: string, maxLen: number): boolean {
  return (text ?? '').length > maxLen && Number.isFinite(maxLen) && maxLen >= 0;
}
