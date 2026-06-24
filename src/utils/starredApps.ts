const STORAGE_KEY = 'guia-starred-apps';

function readSet(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function writeSet(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

export function isAppStarred(name: string | undefined): boolean {
  if (!name) return false;
  return readSet().has(name);
}

export function toggleAppStar(name: string | undefined): boolean {
  if (!name) return false;
  const set = readSet();
  if (set.has(name)) set.delete(name);
  else set.add(name);
  writeSet(set);
  return set.has(name);
}

export function listStarredApps(): string[] {
  return [...readSet()];
}
