/** Flatten one level of nested arrays (non-arrays pass through). */
export function flattenOne<T>(items: readonly (T | readonly T[])[]): T[] {
  const out: T[] = [];
  for (const item of items) {
    if (Array.isArray(item)) {
      for (const inner of item) out.push(inner as T);
    } else {
      out.push(item as T);
    }
  }
  return out;
}
