const PREFIX = 'guia:';

/** Build a stable namespaced localStorage key (strips unsafe chars from segments). */
export function storageKey(...parts: string[]): string {
  const segs = parts
    .map((p) => String(p ?? '').trim().toLowerCase().replace(/[^a-z0-9._-]+/g, '-'))
    .filter(Boolean);
  if (!segs.length) return `${PREFIX}default`;
  return `${PREFIX}${segs.join(':')}`;
}

/** True if a key was produced by `storageKey` (or shares the app prefix). */
export function isGuiaStorageKey(key: string): boolean {
  return typeof key === 'string' && key.startsWith(PREFIX);
}
