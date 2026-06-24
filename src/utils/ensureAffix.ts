/** Ensure `text` starts with `prefix` (no double-prefix). */
export function ensurePrefix(text: string, prefix: string): string {
  const s = text ?? '';
  const p = prefix ?? '';
  if (!p) return s;
  return s.startsWith(p) ? s : p + s;
}

/** Ensure `text` ends with `suffix` (no double-suffix). */
export function ensureSuffix(text: string, suffix: string): string {
  const s = text ?? '';
  const x = suffix ?? '';
  if (!x) return s;
  return s.endsWith(x) ? s : s + x;
}
