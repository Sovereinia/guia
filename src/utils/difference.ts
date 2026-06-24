/** Elements in `a` that are not present in `b` (SameValueZero via Set). Order preserved from `a`. */
export function difference<T>(a: readonly T[], b: readonly T[]): T[] {
  const exclude = new Set(b);
  return a.filter((item) => !exclude.has(item));
}
