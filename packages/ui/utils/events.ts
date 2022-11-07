import { SyntheticEvent } from 'react';

/**
 * Make sure you really want this! This will break any child links, checkboxes, etc.
 * stopPropagation() might be all you need!
 */
export function stopClick(e?: SyntheticEvent | DragEvent) {
  e?.preventDefault();
  e?.stopPropagation();
}

export function preventDefault(e?: SyntheticEvent) {
  e?.preventDefault();
}

export function stopPropagation(e?: SyntheticEvent) {
  e?.stopPropagation();
}
