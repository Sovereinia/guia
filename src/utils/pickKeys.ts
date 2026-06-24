/** Shallow pick listed keys from an object (missing keys omitted). */
export function pickKeys<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      out[k] = obj[k];
    }
  }
  return out;
}

/** Shallow omit listed keys from an object. */
export function omitKeys<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K> {
  const skip = new Set<PropertyKey>(keys as readonly PropertyKey[]);
  const out = { ...obj } as T;
  for (const k of skip) delete (out as Record<PropertyKey, unknown>)[k];
  return out as Omit<T, K>;
}
