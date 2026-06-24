/** Return a new Set with `value` toggled (add if missing, remove if present). */
export function toggleInSet<T>(set: ReadonlySet<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

/** True if every `values` entry is in `set`. */
export function setHasAll<T>(set: ReadonlySet<T>, values: readonly T[]): boolean {
  for (const v of values) if (!set.has(v)) return false;
  return true;
}
