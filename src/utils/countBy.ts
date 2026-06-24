/** Count items per key; returns Map with insertion order of first key sighting. */
export function countBy<T>(items: readonly T[], keyOf: (item: T) => string): Map<string, number> {
  const map = new Map<string, number>();
  for (const item of items) {
    const k = keyOf(item);
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return map;
}

/** Count how many items satisfy `pred`. */
export function countWhere<T>(items: readonly T[], pred: (item: T) => boolean): number {
  let n = 0;
  for (const item of items) if (pred(item)) n += 1;
  return n;
}
