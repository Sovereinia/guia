import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce, normalizeDebounceMs } from './debounce';

describe('normalizeDebounceMs', () => {
  it('falls back and clamps', () => {
    expect(normalizeDebounceMs(NaN)).toBe(200);
    expect(normalizeDebounceMs(-1)).toBe(200);
    expect(normalizeDebounceMs(150)).toBe(150);
    expect(normalizeDebounceMs(99999)).toBe(5000);
  });
});

describe('debounce', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('invokes once after quiet period with latest args', () => {
    const fn = vi.fn();
    const d = debounce(fn, 100);
    d('a');
    d('b');
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('b');
  });

  it('cancel prevents invocation', () => {
    const fn = vi.fn();
    const d = debounce(fn, 50);
    d(1);
    d.cancel();
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();
  });
});
