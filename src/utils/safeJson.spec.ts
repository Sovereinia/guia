import { describe, expect, it } from 'vitest';
import { safeJsonParse, safeJsonStringify } from './safeJson';

describe('safeJsonParse', () => {
  it('parses valid JSON and falls back otherwise', () => {
    expect(safeJsonParse('{"a":1}', {})).toEqual({ a: 1 });
    expect(safeJsonParse('nope', ['x'])).toEqual(['x']);
    expect(safeJsonParse(null, 0)).toBe(0);
    expect(safeJsonParse('', 'def')).toBe('def');
  });
});

describe('safeJsonStringify', () => {
  it('stringifies plain data', () => {
    expect(safeJsonStringify({ ok: true })).toBe('{"ok":true}');
  });
});
