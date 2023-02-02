import { animals, colors, uniqueNamesGenerator } from 'unique-names-generator';

function generateName() {
  return uniqueNamesGenerator({ dictionaries: [colors, animals], length: 2 });
}

export function createQueue<Item>(fn: (item: Item) => Promise<void>, millis = 0) {
  const name = generateName();
  let i = 0;
  let queue = [] as { i: number; item: Item }[];
  let isRunning = false;

  async function addToQueue(item: Item) {
    queue.push({ i: ++i, item });

    if (isRunning) {
      return;
    }

    isRunning = true;

    while (queue.length) {
      const queueItem = queue.shift();
      const timeName = JSON.stringify({ name, i: queueItem?.i, length: queue.length });

      console.time(timeName);

      queueItem && (await fn(queueItem.item));

      console.timeEnd(timeName);

      await wait(millis);
    }

    isRunning = false;
  }

  addToQueue.empty = () => {
    isRunning = true;
    queue = [];
  };

  return addToQueue;
}

function wait(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}
