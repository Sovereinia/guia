/** Pair elements from two arrays up to the shorter length. */
export function zipArrays<A, B>(a: readonly A[], b: readonly B[]): Array<[A, B]> {
  const n = Math.min(a.length, b.length);
  const out: Array<[A, B]> = new Array(n);
  for (let i = 0; i < n; i++) out[i] = [a[i], b[i]];
  return out;
}

/** Interleave two arrays (a0,b0,a1,b1,...); leftovers appended. */
export function interleave<T>(a: readonly T[], b: readonly T[]): T[] {
  const out: T[] = [];
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (i < a.length) out.push(a[i]);
    if (i < b.length) out.push(b[i]);
  }
  return out;
}
