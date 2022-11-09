type Params = Record<string, any>;

export function addParams(uri: string, params: Params) {
  const url = new URL(uri);
  const keys = Object.keys(params);

  keys.forEach((key) => {
    const value = params[key];
    const isDefined = typeof value !== 'undefined';

    isDefined && url.searchParams.append(key, String(value));
  });

  return url.toString();
}

export function validateUrl(u?: string): string | false {
  try {
    if (!u) throw new Error('URL is required');

    const url = new URL(u);

    return url.toString();
  } catch (e) {
    return false;
  }
}
