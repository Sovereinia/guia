/** Inclusive integer range from `start` to `end` (direction-aware). Caps length at 10_000. */
export function range(start: number, end: number): number[] {
  const a = Math.trunc(start);
  const b = Math.trunc(end);
  const step = a <= b ? 1 : -1;
  const len = Math.min(Math.abs(b - a) + 1, 10_000);
  const out = new Array<number>(len);
  for (let i = 0; i < len; i++) out[i] = a + i * step;
  return out;
}

/** Zero-based indices `0 .. count-1` (empty if count <= 0). */
export function indices(count: number): number[] {
  const n = Math.trunc(count);
  if (!Number.isFinite(n) || n <= 0) return [];
  return range(0, n - 1);
}
