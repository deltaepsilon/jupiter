export function addParams(uri: string, params: Record<string, any>) {
  const components = Object.entries(params)
    .filter(([key, value]) => typeof key !== 'undefined' && typeof value !== 'undefined')
    .reduce((acc, [key, value]) => acc.concat([`${key}=${encodeURIComponent(value)}`]), [] as string[]);
  return `${uri}?${components.join('&')}`;
}
