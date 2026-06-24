/** Result of attempting to write plain text to the clipboard. */
export type ClipboardWriteResult = 'ok' | 'empty' | 'unsupported' | 'denied';

/**
 * Write text to the clipboard when available.
 * Pure decision helper + thin write — pass `write` for tests (default: navigator.clipboard.writeText).
 */
export async function copyTextToClipboard(
  text: string,
  write: (value: string) => Promise<void> = defaultWrite,
): Promise<ClipboardWriteResult> {
  const value = text ?? '';
  if (!value.trim()) return 'empty';
  try {
    await write(value);
    return 'ok';
  } catch {
    return 'denied';
  }
}

async function defaultWrite(value: string): Promise<void> {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    throw new Error('unsupported');
  }
  await navigator.clipboard.writeText(value);
}

/** Map write result to a short status key for UI feedback. */
export function clipboardFeedbackKey(result: ClipboardWriteResult): 'copied' | 'failed' | 'empty' {
  if (result === 'ok') return 'copied';
  if (result === 'empty') return 'empty';
  return 'failed';
}
