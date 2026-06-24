/** Group items by string key; preserves first-seen key order in returned Map. */
export function groupBy<T>(items: readonly T[], keyOf: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const k = keyOf(item);
    const bucket = map.get(k);
    if (bucket) bucket.push(item);
    else map.set(k, [item]);
  }
  return map;
}

/** Same as groupBy but returns a plain object (keys insertion-ordered in modern engines). */
export function groupByRecord<T>(items: readonly T[], keyOf: (item: T) => string): Record<string, T[]> {
  const out: Record<string, T[]> = {};
  for (const [k, v] of groupBy(items, keyOf)) out[k] = v;
  return out;
}
