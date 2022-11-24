export interface Options {
  millis?: number;
  leading?: boolean;
}
export function debounce<F extends Function>(func: F, { millis = 300, leading = false }: Options = {}) {
  return leading ? leadingDebounce<F>(func, { millis }) : trailingDebounce<F>(func, { millis });
}

function leadingDebounce<F extends Function>(func: F, { millis }: Pick<Options, 'millis'>) {
  let blocked = false;

  return (...args: any[]) => {
    if (!blocked) {
      blocked = true;

      func(...args);

      setTimeout(() => {
        blocked = false;
      }, millis);
    }
  };
}

function trailingDebounce<F extends Function>(func: F, { millis }: Pick<Options, 'millis'>) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    timer && clearTimeout(timer);

    timer = setTimeout(() => func(...args), millis);
  };
}
