type Callback = () => Promise<void>;

export function multiplex(max = 1) {
  let runningCount = 0;
  let queue: Callback[] = [];

  async function startQueue() {
    const callback = queue.shift();

    if (callback) {
      runningCount++;

      await callback();

      runningCount--;

      startQueue();
    }
  }

  return (callback: Callback) => {
    queue.push(callback);

    if (runningCount < max) {
      startQueue();
    }
  };
}
