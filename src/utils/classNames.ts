type ClassValue = string | false | null | undefined | 0 | ClassValue[];

/** Join truthy class tokens (strings / nested arrays); skips falsey entries. */
export function classNames(...parts: ClassValue[]): string {
  const out: string[] = [];
  const walk = (v: ClassValue) => {
    if (!v) return;
    if (Array.isArray(v)) {
      for (const item of v) walk(item);
      return;
    }
    if (typeof v === 'string') {
      const t = v.trim();
      if (t) out.push(t);
    }
  };
  for (const p of parts) walk(p);
  return out.join(' ');
}

/** Alias used by some codebases. */
export const cx = classNames;
