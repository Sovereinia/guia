import { describe, expect, it, vi } from 'vitest';
import { clipboardFeedbackKey, copyTextToClipboard } from './clipboardCopy';

describe('copyTextToClipboard', () => {
  it('returns empty for blank input without calling write', async () => {
    const write = vi.fn(async () => {});
    expect(await copyTextToClipboard('   ', write)).toBe('empty');
    expect(write).not.toHaveBeenCalled();
  });

  it('returns ok when write resolves', async () => {
    const write = vi.fn(async () => {});
    expect(await copyTextToClipboard('hello', write)).toBe('ok');
    expect(write).toHaveBeenCalledWith('hello');
  });

  it('returns denied when write rejects', async () => {
    const write = vi.fn(async () => {
      throw new Error('nope');
    });
    expect(await copyTextToClipboard('x', write)).toBe('denied');
  });
});

describe('clipboardFeedbackKey', () => {
  it('maps results for UI', () => {
    expect(clipboardFeedbackKey('ok')).toBe('copied');
    expect(clipboardFeedbackKey('empty')).toBe('empty');
    expect(clipboardFeedbackKey('denied')).toBe('failed');
    expect(clipboardFeedbackKey('unsupported')).toBe('failed');
  });
});
