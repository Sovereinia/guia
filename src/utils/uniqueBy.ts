/** Keep first occurrence of each key (stable order). */
export function uniqueBy<T>(items: readonly T[], keyOf: (item: T) => string | number): T[] {
  const seen = new Set<string | number>();
  const out: T[] = [];
  for (const item of items) {
    const k = keyOf(item);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

/** Dedupe string list (first wins). */
export function uniqueStrings(items: readonly string[]): string[] {
  return uniqueBy(items, (s) => s);
}
