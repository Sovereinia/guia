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

export function filterApps(apps: App[], category: CategoryId, query: string): App[] {
  const lowerQuery = query.toLowerCase();
  return apps.filter(app => {
    const isSameCategory =
      category === 'all' || app.categories.includes(category);
    const nameMatchesQuery =
      app.name.toLowerCase().includes(lowerQuery) ||
      (app.alternatives || []).some(alt => alt.toLowerCase().includes(lowerQuery));
    return isSameCategory && nameMatchesQuery;
  });
}
