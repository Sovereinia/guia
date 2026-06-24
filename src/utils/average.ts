/** Arithmetic mean of finite numbers in `values`; returns 0 for empty / no finite entries. */
export function average(values: readonly number[]): number {
  let sum = 0;
  let count = 0;
  for (const v of values) {
    if (!Number.isFinite(v)) continue;
    sum += v;
    count += 1;
  }
  return count === 0 ? 0 : sum / count;
}
