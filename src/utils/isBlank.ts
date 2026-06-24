/** True for null, undefined, or whitespace-only string. */
export function isBlank(value: string | null | undefined): boolean {
  return value == null || String(value).trim() === '';
}

/** Inverse of isBlank. */
export function isPresent(value: string | null | undefined): boolean {
  return !isBlank(value);
}

/** Trim or return empty string for nullish. */
export function trimOrEmpty(value: string | null | undefined): string {
  return value == null ? '' : String(value).trim();
}
