const STORAGE_KEY = 'guia-recent-apps';
const MAX_RECENT = 8;

function readList(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as unknown;
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function writeList(names: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(names.slice(0, MAX_RECENT)));
}

/** Record that the user opened an app (by display name). Most recent first. */
export function pushRecentApp(name: string | undefined): string[] {
  if (!name?.trim()) return readList();
  const next = [name, ...readList().filter((n) => n !== name)].slice(0, MAX_RECENT);
  writeList(next);
  return next;
}

export function listRecentApps(): string[] {
  return readList();
}

export function clearRecentApps(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/** Resolve recent names against the current catalog (drop missing). */
export function resolveRecentApps<T extends { name: string }>(catalog: T[], names: string[] = listRecentApps()): T[] {
  const byName = new Map(catalog.map((a) => [a.name, a]));
  return names.map((n) => byName.get(n)).filter((a): a is T => !!a);
}
