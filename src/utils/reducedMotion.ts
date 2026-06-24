/** True when the user prefers fewer non-essential animations. */
export function prefersReducedMotion(
  media: { matches: boolean } | null | undefined = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null,
): boolean {
  return !!media?.matches;
}

/** Gate decorative motion: returns `enabled` unless reduced motion is preferred. */
export function allowDecorativeMotion(enabled: boolean, reduced?: boolean): boolean {
  const rm = reduced ?? prefersReducedMotion();
  return enabled && !rm;
}
