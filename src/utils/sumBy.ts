/** Sum numeric projections of items (non-finite values treated as 0). */
export function sumBy<T>(items: readonly T[], project: (item: T) => number): number {
  let total = 0;
  for (const item of items) {
    const n = project(item);
    total += Number.isFinite(n) ? n : 0;
  }
  return total;
}
