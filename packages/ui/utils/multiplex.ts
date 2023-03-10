type Callback = () => Promise<void>;

export function multiplex(max = 1) {
  const queue: Callback[] = [];
  let resolve: (resolved: boolean) => void;
  let runningCount = 0;

  async function startQueue() {
    const callback = queue.shift();

    if (callback) {
      runningCount++;

      await callback();

      runningCount--;

      startQueue();
    } else if (runningCount === 0 && resolve) {
      resolve(true);
    }
  }

  function add(callback: Callback) {
    queue.push(callback);

    if (runningCount < max) {
      startQueue();
    }
  }

  function getPromise() {
    return queue.length ? new Promise((r) => (resolve = r)) : Promise.resolve(true);
  }

  return { add, getPromise };
}
