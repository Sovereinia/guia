/** Split `items` into [pass, fail] preserving relative order in each. */
export function partition<T>(items: readonly T[], pred: (item: T, index: number) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  items.forEach((item, i) => {
    if (pred(item, i)) pass.push(item);
    else fail.push(item);
  });
  return [pass, fail];
}
