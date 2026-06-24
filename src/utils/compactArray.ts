/** Drop null and undefined entries (preserves 0, '', false). */
export function compactArray<T>(items: readonly (T | null | undefined)[]): T[] {
  const out: T[] = [];
  for (const item of items) {
    if (item != null) out.push(item);
  }
  return out;
}

/** Drop falsy entries (0, '', false, null, undefined). */
export function compactTruthy<T>(items: readonly (T | null | undefined | false | 0 | '')[]): T[] {
  const out: T[] = [];
  for (const item of items) {
    if (item) out.push(item as T);
  }
  return out;
}
