/** Elements present in both `a` and `b` (Set membership on `b`). Order preserved from `a`. */
export function intersection<T>(a: readonly T[], b: readonly T[]): T[] {
  const keep = new Set(b);
  return a.filter((item) => keep.has(item));
}
