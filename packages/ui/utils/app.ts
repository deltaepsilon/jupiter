export function isServer() {
  return typeof window === 'undefined' && !isServiceWorker();
}

export function isClient(callback?: () => void) {
  const isClient = typeof window !== 'undefined' || isServiceWorker();

  return isClient && callback ? callback() : isClient;
}

function isServiceWorker() {
  return typeof self !== 'undefined';
}
