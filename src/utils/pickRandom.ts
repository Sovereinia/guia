/** Pick one element pseudo-randomly; returns undefined for empty input. */
export function pickRandomItem<T>(
  items: readonly T[],
  random: () => number = Math.random,
): T | undefined {
  if (!items.length) return undefined;
  const r = random();
  const idx = Math.min(items.length - 1, Math.max(0, Math.floor(r * items.length)));
  return items[idx];
}
