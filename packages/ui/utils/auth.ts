const ONE_HOUR_MS = 60 * 60 * 1000;

export function getIsStaleAccessToken(updated: Date) {
  return updated.getTime() < Date.now() - ONE_HOUR_MS;
}
