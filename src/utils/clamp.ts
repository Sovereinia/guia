/** Constrain `n` to inclusive [min, max]. Non-finite input uses min. */
export function clamp(n: number, min: number, max: number): number {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  if (!Number.isFinite(n)) return lo;
  return Math.min(hi, Math.max(lo, n));
}

/** Clamp an integer index into `0 .. length-1` (empty → 0). */
export function clampIndex(index: number, length: number): number {
  if (!Number.isFinite(length) || length <= 0) return 0;
  return clamp(Math.trunc(index), 0, length - 1);
}
