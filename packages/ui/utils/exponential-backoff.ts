interface Args {
  delay: number;
  callback: () => void;
  max: number;
}

export function exponentialBackoff({ delay, callback, max = Infinity }: Args, retries = 0) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let cancel = () => {};
  const millis = Math.min(2 ** retries * delay, max);

  console.info(`Retrying in ${millis}ms...`);

  timer = setTimeout(() => {
    callback();

    cancel = exponentialBackoff({ delay, callback, max }, retries + 1);
  }, millis);

  return () => {
    timer && clearTimeout(timer);
    cancel();
  };
}
