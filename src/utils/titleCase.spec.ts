import { describe, expect, it } from 'vitest';
import { capitalize, titleCase } from './titleCase';

describe('capitalize', () => {
  it('uppercases first char only', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('')).toBe('');
  });
});

describe('titleCase', () => {
  it('titles spaced and hyphenated words', () => {
    expect(titleCase('hello world')).toBe('Hello World');
    expect(titleCase('foo-bar_baz')).toBe('Foo-Bar_Baz');
  });
});
