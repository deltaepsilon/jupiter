import { isClient } from './app';

export function cleanPath() {
  return isClient() ? `${window.location.pathname}${window.location.search}` : '';
}
