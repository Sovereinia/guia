/** Uppercase the first character; rest unchanged. Empty/nullish-ish coerced to empty string. */
export function capitalizeFirst(value: string): string {
  const s = value ?? '';
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
