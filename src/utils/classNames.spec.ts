import { describe, expect, it } from 'vitest';
import { classNames, cx } from './classNames';

describe('classNames', () => {
  it('joins truthy tokens and skips falsey', () => {
    expect(classNames('a', false && 'b', 'c')).toBe('a c');
    expect(classNames('  x  ', null, undefined, 0 as unknown as string)).toBe('x');
    expect(classNames(['a', ['b', false, 'c']])).toBe('a b c');
    expect(cx('btn', true && 'btn-primary')).toBe('btn btn-primary');
  });
});
