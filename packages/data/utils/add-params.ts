export function addParams(uri: string, params: Record<string, any>) {
  const components = Object.entries(params).reduce(
    (acc, [key, value]) => acc.concat([`${key}=${encodeURIComponent(value)}`]),
    [] as string[]
  );
  return `${uri}?${components.join('&')}`;
}
