/** Split `items` into chunks of `size` (last chunk may be shorter). Size clamped to >= 1. */
export function chunkArray<T>(items: readonly T[], size: number): T[][] {
  const n = Math.max(1, Math.trunc(Number(size)) || 1);
  if (items.length === 0) return [];
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += n) {
    out.push(items.slice(i, i + n));
  }
  return out;
}
