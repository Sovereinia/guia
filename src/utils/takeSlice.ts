/** First `n` elements (n clamped to >= 0). */
export function takeFirst<T>(items: readonly T[], n: number): T[] {
  const count = Math.max(0, Math.trunc(Number(n)) || 0);
  return items.slice(0, count);
}

/** Last `n` elements (n clamped to >= 0). */
export function takeLast<T>(items: readonly T[], n: number): T[] {
  const count = Math.max(0, Math.trunc(Number(n)) || 0);
  if (count === 0) return [];
  return items.slice(-count);
}
