/** Return a new array rotated by `offset` positions (positive = left, negative = right). */
export function rotateArray<T>(items: readonly T[], offset: number): T[] {
  const len = items.length;
  if (len === 0) return [];
  const n = Math.trunc(Number(offset)) || 0;
  const shift = ((n % len) + len) % len;
  if (shift === 0) return items.slice();
  return items.slice(shift).concat(items.slice(0, shift));
}
