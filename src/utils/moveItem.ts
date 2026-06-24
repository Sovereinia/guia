/** Return a new array with element at `from` moved to `to` (clamped indices). */
export function moveItem<T>(items: readonly T[], from: number, to: number): T[] {
  const len = items.length;
  if (len === 0) return [];
  const src = Math.max(0, Math.min(len - 1, Math.trunc(from)));
  const dst = Math.max(0, Math.min(len - 1, Math.trunc(to)));
  if (src === dst) return items.slice();
  const next = items.slice();
  const [item] = next.splice(src, 1);
  next.splice(dst, 0, item);
  return next;
}
