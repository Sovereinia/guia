import { describe, expect, it } from 'vitest';
import { uniqueBy, uniqueStrings } from './uniqueBy';

describe('uniqueBy', () => {
  it('keeps first by key', () => {
    const rows = [
      { id: 'a', n: 1 },
      { id: 'b', n: 2 },
      { id: 'a', n: 3 },
    ];
    expect(uniqueBy(rows, (r) => r.id)).toEqual([
      { id: 'a', n: 1 },
      { id: 'b', n: 2 },
    ]);
  });
});

describe('uniqueStrings', () => {
  it('dedupes preserving order', () => {
    expect(uniqueStrings(['x', 'y', 'x', 'z'])).toEqual(['x', 'y', 'z']);
  });
});
