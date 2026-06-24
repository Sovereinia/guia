/** Shallow equality for two arrays (SameValueZero element compare, length must match). */
export function arrayEquals<T>(a: readonly T[], b: readonly T[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    const y = b[i];
    if (x === y) continue;
    // SameValueZero for NaN
    if (x !== x && y !== y) continue;
    return false;
  }
  return true;
}
