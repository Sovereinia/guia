/** Advance shuffle generation counter (wraps at safe int bound). */
export function nextShuffleTrigger(current: number): number {
  const n = Number.isFinite(current) ? Math.trunc(current) : 0;
  return n >= Number.MAX_SAFE_INTEGER - 1 ? 1 : n + 1;
}
