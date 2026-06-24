import type { App } from '@/types';

/** Resolve the current app's index within the visible/filtered list by name. */
export function findAppIndex(apps: App[], currentName: string | undefined): number {
  if (!currentName || !apps.length) return -1;
  return apps.findIndex((app) => app.name === currentName);
}

/** Previous app in the list, or null when at the start / not found. */
export function getPreviousApp(apps: App[], currentName: string | undefined): App | null {
  const index = findAppIndex(apps, currentName);
  if (index <= 0) return null;
  return apps[index - 1] ?? null;
}

/** Next app in the list, or null when at the end / not found. */
export function getNextApp(apps: App[], currentName: string | undefined): App | null {
  const index = findAppIndex(apps, currentName);
  if (index < 0 || index >= apps.length - 1) return null;
  return apps[index + 1] ?? null;
}

export function canGoPrevious(apps: App[], currentName: string | undefined): boolean {
  return getPreviousApp(apps, currentName) !== null;
}

export function canGoNext(apps: App[], currentName: string | undefined): boolean {
  return getNextApp(apps, currentName) !== null;
}
