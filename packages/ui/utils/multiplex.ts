type Callback = () => Promise<void>;

export function multiplex(max = 1) {
  const queue: Callback[] = [];
  let runningCount = 0;

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
