/** Unique elements from `a` then `b` (first-seen wins). Preserves encounter order. */
export function union<T>(a: readonly T[], b: readonly T[]): T[] {
  const seen = new Set<T>();
  const out: T[] = [];
  for (const item of a) {
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  for (const item of b) {
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}
