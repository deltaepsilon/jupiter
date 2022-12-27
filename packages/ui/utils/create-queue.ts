export function createQueue<T>(fn: (item: T) => Promise<void>, millis = 0) {
  const queue = [] as T[];
  let isRunning = false;

  return async (item: T) => {
    queue.push(item);

    if (isRunning) {
      return;
    }

    isRunning = true;

    while (queue.length) {
      const item = queue.shift();

      item && (await fn(item));

      await wait(millis);
    }

    isRunning = false;
  };
}

function wait(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}
