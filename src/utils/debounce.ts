/** Schedule `fn` to run after `waitMs` of quiet; returns cancel+flush helpers. */
export type DebouncedFn<Args extends unknown[]> = ((...args: Args) => void) & {
  cancel: () => void;
  flush: (...args: Args) => void;
};

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  waitMs: number,
): DebouncedFn<Args> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Args | null = null;

  const cancel = () => {
    if (timer != null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const run = (args: Args) => {
    lastArgs = null;
    fn(...args);
  };

  const wrapped = ((...args: Args) => {
    lastArgs = args;
    cancel();
    timer = setTimeout(() => {
      timer = null;
      if (lastArgs) run(lastArgs);
    }, waitMs);
  }) as DebouncedFn<Args>;

  wrapped.cancel = cancel;
  wrapped.flush = (...args: Args) => {
    cancel();
    run(args.length ? args : (lastArgs ?? ([] as unknown as Args)));
  };

  return wrapped;
}

/** Clamp debounce wait to a sensible UI range (ms). */
export function normalizeDebounceMs(ms: number, fallback = 200): number {
  if (!Number.isFinite(ms) || ms < 0) return fallback;
  return Math.min(Math.floor(ms), 5000);
}
