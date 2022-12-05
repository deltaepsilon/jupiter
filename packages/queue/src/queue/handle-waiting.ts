import { Callback, MetadataKey, QueueKey, QueueTasks, TaskKey, TaskState, metadataSchema, taskSchema } from '../schema';
import {
  DataSnapshot,
  DatabaseReference,
  equalTo,
  get,
  increment,
  limitToFirst,
  onChildAdded,
  onValue,
  orderByChild,
  query,
  update,
} from 'firebase/database';
import { debounce, mapTasks, pageThroughTasks, wait } from '../utils';

import { handleActive } from './handle-active';

const ONE_SECOND = 1000;

export function handleWaiting({
  batchSize,
  callback,
  metadataRef,
  queueRef,
  tasksRef,
}: {
  batchSize: number;
  callback: Callback;
  metadataRef: DatabaseReference;
  queueRef: DatabaseReference;
  tasksRef: DatabaseReference;
}) {
  const activeQuery = query(tasksRef, orderByChild(TaskKey.state), limitToFirst(batchSize), equalTo(TaskState.active));

  const unlistenMetadata = onValue(
    metadataRef,
    debounce<(snapshot: DataSnapshot) => Promise<void>>(
      async (metadataSnapshot) => {
        const metadata = metadataSchema.parse(metadataSnapshot.val());
        const { activeCount = 0, waitingCount = 0 } = metadata;
        const countToActivate = Math.min(Math.max(0, batchSize - Math.max(0, activeCount)), waitingCount);

        if (countToActivate > 0) {
          const waitingDataSnapshot = await get(
            query(tasksRef, orderByChild(TaskKey.state), limitToFirst(countToActivate), equalTo(TaskState.waiting))
          );
          const newWaitingTasks = mapTasks(waitingDataSnapshot);
          const newWaitingTaskCount = Object.keys(newWaitingTasks).length;
          const updates = Object.entries(newWaitingTasks).reduce(
            (acc, [key]) => {
              acc[`${QueueKey.task}/${key}/${TaskKey.state}`] = TaskState.active;
              acc[`${QueueKey.task}/${key}/${TaskKey.started}`] = Date.now();

              return acc;
            },
            {
              [`${QueueKey.metadata}/${MetadataKey.activeCount}`]: increment(+newWaitingTaskCount),
              [`${QueueKey.metadata}/${MetadataKey.waitingCount}`]: increment(-newWaitingTaskCount),
            } as Record<string, TaskState | ReturnType<typeof increment> | number>
          );

          await update(queueRef, updates);
        }
      },
      { millis: ONE_SECOND * 1.5 } // Needs to be a bit longer than the setInterval below
    )
  );

  let activeCount = 0;
  let errorCount = 0;
  let completeCount = 0;
  const unlistenActiveAdded = onChildAdded(activeQuery, async (dataSnapshot) => {
    const { success } = await handleActive({ callback, dataSnapshot, queueRef });

    if (success) {
      completeCount++;
    } else {
      errorCount++;
    }

    activeCount--;
  });
  const timer = setInterval(async () => {
    const updates = {
      [MetadataKey.activeCount]: increment(activeCount),
      [MetadataKey.completeCount]: increment(completeCount),
      [MetadataKey.errorCount]: increment(errorCount),
    };

    activeCount = 0;
    completeCount = 0;
    errorCount = 0;

    await update(metadataRef, updates);
  }, ONE_SECOND);

  return () => {
    unlistenActiveAdded();
    unlistenMetadata();

    setTimeout(() => {
      clearInterval(timer);
    }, ONE_SECOND);
  };
}
