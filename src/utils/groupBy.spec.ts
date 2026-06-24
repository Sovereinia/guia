import { describe, expect, it } from 'vitest';
import { groupBy, groupByRecord } from './groupBy';

describe('groupBy', () => {
  it('buckets by key preserving order within groups', () => {
    const items = [
      { c: 'a', n: 1 },
      { c: 'b', n: 2 },
      { c: 'a', n: 3 },
    ];
    const m = groupBy(items, (i) => i.c);
    expect([...m.keys()]).toEqual(['a', 'b']);
    expect(m.get('a')?.map((x) => x.n)).toEqual([1, 3]);
  });
});

describe('groupByRecord', () => {
  it('returns plain object buckets', () => {
    expect(groupByRecord([{ t: 'x' }, { t: 'x' }], (i) => i.t).x).toHaveLength(2);
  });
});
