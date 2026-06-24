/** Uppercase first character; rest unchanged (locale-safe via toLocaleUpperCase default). */
export function capitalize(text: string): string {
  const s = text ?? '';
  if (!s) return s;
  return s.charAt(0).toLocaleUpperCase() + s.slice(1);
}

/** Title-case words separated by spaces/hyphens/underscores. */
export function titleCase(text: string): string {
  return String(text ?? '')
    .split(/([\s_-]+)/)
    .map((part, i) => (i % 2 === 0 ? capitalize(part.toLocaleLowerCase()) : part))
    .join('');
}
