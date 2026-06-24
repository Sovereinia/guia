import { describe, it, expect } from 'vitest';
import {
  findAppIndex,
  getPreviousApp,
  getNextApp,
  canGoPrevious,
  canGoNext,
} from './modalNavigation';
import type { App } from '@/types';

function stubApp(name: string): App {
  return {
    name,
    description: '',
    longDescription: '',
    features: [],
    categories: ['social'],
    alternatives: [],
    protocol: [],
    links: [],
    banner: { src: '', alt: '' },
  } as App;
}

const apps = [stubApp('Alpha'), stubApp('Beta'), stubApp('Gamma')];

describe('modalNavigation', () => {
  it('findAppIndex returns the correct position by name', () => {
    expect(findAppIndex(apps, 'Beta')).toBe(1);
    expect(findAppIndex(apps, 'Missing')).toBe(-1);
    expect(findAppIndex([], 'Alpha')).toBe(-1);
    expect(findAppIndex(apps, undefined)).toBe(-1);
  });

  it('getPreviousApp walks backward through the filtered list', () => {
    expect(getPreviousApp(apps, 'Beta')?.name).toBe('Alpha');
    expect(getPreviousApp(apps, 'Alpha')).toBeNull();
    expect(getPreviousApp(apps, 'Missing')).toBeNull();
  });

  it('getNextApp walks forward through the filtered list', () => {
    expect(getNextApp(apps, 'Beta')?.name).toBe('Gamma');
    expect(getNextApp(apps, 'Gamma')).toBeNull();
    expect(getNextApp(apps, 'Missing')).toBeNull();
  });

  it('canGoPrevious / canGoNext reflect boundaries', () => {
    expect(canGoPrevious(apps, 'Beta')).toBe(true);
    expect(canGoPrevious(apps, 'Alpha')).toBe(false);
    expect(canGoNext(apps, 'Beta')).toBe(true);
    expect(canGoNext(apps, 'Gamma')).toBe(false);
  });

  it('respects a filtered subset (only visible apps)', () => {
    const filtered = [apps[0], apps[2]]; // Alpha, Gamma only
    expect(getNextApp(filtered, 'Alpha')?.name).toBe('Gamma');
    expect(getPreviousApp(filtered, 'Gamma')?.name).toBe('Alpha');
    expect(getNextApp(filtered, 'Gamma')).toBeNull();
  });
});
