import type { App, CategoryId } from '@/types';

export function countInboundLinks(app: App): number {
  return (app.links || []).filter(link =>
    link.url.includes('sovereinia.org')
  ).length;
}

export function shuffleArray<T>(array: T[]): T[] {
  return array
    .map(a => [a, Math.random()] as [T, number])
    .sort((a, b) => a[1] - b[1])
    .map(([item]) => item);
}

export function sortAppsByLinksThenRandom(apps: App[]): App[] {
  const grouped = apps.reduce((acc, app) => {
    const count = countInboundLinks(app);
    if (!acc[count]) acc[count] = [];
    acc[count].push(app);
    return acc;
  }, {} as Record<number, App[]>);

  const sortedKeys = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a); // mais links primeiro

  return sortedKeys.flatMap(key => shuffleArray(grouped[key]));
}

export function shuffleAppsPurely(apps: App[]): App[] {
  return shuffleArray([...apps]);
}

/** Higher is better. Used to rank search hits without reordering when query is empty. */
export function scoreAppMatch(app: App, lowerQuery: string): number {
  if (!lowerQuery) return 0;
  const name = app.name.toLowerCase();
  const alts = (app.alternatives || []).map((a) => a.toLowerCase());
  const desc = (app.description || '').toLowerCase();
  const longDesc = (app.longDescription || '').toLowerCase();

  if (name === lowerQuery) return 100;
  if (name.startsWith(lowerQuery)) return 80;
  if (name.includes(lowerQuery)) return 60;
  if (alts.some((a) => a === lowerQuery)) return 55;
  if (alts.some((a) => a.startsWith(lowerQuery))) return 45;
  if (alts.some((a) => a.includes(lowerQuery))) return 35;
  if (desc.includes(lowerQuery)) return 20;
  if (longDesc.includes(lowerQuery)) return 10;
  return 0;
}

export function appMatchesQuery(app: App, lowerQuery: string): boolean {
  if (!lowerQuery) return true;
  return scoreAppMatch(app, lowerQuery) > 0;
}

export function filterApps(apps: App[], category: CategoryId, query: string): App[] {
  const lowerQuery = query.trim().toLowerCase();
  const filtered = apps.filter((app) => {
    const isSameCategory = category === 'all' || app.categories.includes(category);
    return isSameCategory && appMatchesQuery(app, lowerQuery);
  });

  if (!lowerQuery) return filtered;

  return [...filtered].sort((a, b) => {
    const scoreDiff = scoreAppMatch(b, lowerQuery) - scoreAppMatch(a, lowerQuery);
    if (scoreDiff !== 0) return scoreDiff;
    return a.name.localeCompare(b.name);
  });
}
