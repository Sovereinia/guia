import type { App } from '@/types';

/** Apps explicitly recommended for beginners (catalog flag). */
export function isBeginnerApp(app: Pick<App, 'recommendedForBeginners'>): boolean {
  return !!app.recommendedForBeginners;
}

/**
 * Federated / open-protocol apps: has protocol list, protocols category, or protocol use case.
 * Mirrors HomeView filter behavior so chips and wizard stay consistent.
 */
export function isFederatedApp(
  app: Pick<App, 'protocol' | 'categories' | 'useCases'>,
): boolean {
  return (
    (app.protocol || []).length > 0 ||
    (app.categories || []).includes('protocols') ||
    (app.useCases || []).includes('protocol')
  );
}

export function applyQuickFilters<T extends App>(
  list: T[],
  opts: { beginnersOnly?: boolean; federatedOnly?: boolean },
): T[] {
  let out = list;
  if (opts.beginnersOnly) out = out.filter(isBeginnerApp);
  if (opts.federatedOnly) out = out.filter(isFederatedApp);
  return out;
}
