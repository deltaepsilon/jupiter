export function isServer() {
  return typeof window === 'undefined';
}

export function isClient(callback?: () => void) {
  const isClient = typeof window !== 'undefined';

  return isClient && callback ? callback() : isClient;
}
