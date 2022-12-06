import { Callback, MetadataKey, QueueKey, QueueTasks, TaskKey, TaskState, metadataSchema, taskSchema } from '../schema';
import { DatabaseReference, Unsubscribe, child, increment, onValue, push, remove, update } from 'firebase/database';

import { handleWaiting } from './handle-waiting';
import { pageThroughTasks } from '../utils';

interface QueueArgs {
  ref: DatabaseReference;
  batchSize: number;
  callback: Callback;
}

export type QueueValue<Data> = ReturnType<typeof Queue<Data>>;

export function Queue<Data>({ batchSize = 1, callback, ref: queueRef }: QueueArgs) {
  const metadataRef = child(queueRef, QueueKey.metadata);
  const tasksRef = child(queueRef, QueueKey.task);
  let unlisten: Unsubscribe | null;

  function mount() {
    let unlistenWaiting: Unsubscribe | null = null;
    let unlistenWaitingTimer: ReturnType<typeof setTimeout>;

    const unlistenMetadata = onValue(metadataRef, (dataSnapshot) => {
      const value = dataSnapshot.val();
      const parsed = metadataSchema.safeParse(value);

      if (parsed.success) {
        const { isPaused, activeCount, waitingCount } = parsed.data;

        if (!isPaused && !unlistenWaiting) {
          unlistenWaiting = handleWaiting({ batchSize, callback, metadataRef, queueRef, tasksRef });
        } else if (!activeCount && !waitingCount) {
          clearTimeout(unlistenWaitingTimer);

          unlistenWaitingTimer = setTimeout(() => {
            unlistenWaiting?.();
            unlistenWaiting = null;
          }, 1000 * 5);
        }
      }
    });

    return () => {
      unlistenWaiting?.();
      unlistenMetadata();
    };
  }

  async function add(tasks: Data[]) {
    const newTasks = tasks.map((data) =>
      taskSchema.parse({ [TaskKey.created]: Date.now(), [TaskKey.state]: TaskState.waiting, [TaskKey.data]: data })
    );
    const updates = newTasks.reduce(
      (acc, task) => {
        const newRef = push(tasksRef);

        acc[`${QueueKey.task}/${newRef.key}`] = task;

        return acc;
      },
      {
        [`${metadataRef.key}/${MetadataKey.activeCount}`]: increment(0),
        [`${metadataRef.key}/${MetadataKey.errorCount}`]: increment(0),
        [`${metadataRef.key}/${MetadataKey.waitingCount}`]: increment(newTasks.length),
        [`${metadataRef.key}/${MetadataKey.completeCount}`]: increment(0),
        [`${metadataRef.key}/${MetadataKey.count}`]: increment(newTasks.length),
      }
    );

    console.log({ tasks, newTasks, updates });

    await update(queueRef, updates);
  }

  async function empty() {
    unmount();

    await remove(queueRef);
  }

  async function stop() {
    unmount();

    await update(metadataRef, { isPaused: true });
  }

  async function start() {
    await update(metadataRef, { isPaused: false });

    unlisten = mount();
  }

  function unmount() {
    unlisten?.();
    unlisten = null;
  }

  async function requeueByKey(keys: string[], metadataKey: MetadataKey.errorCount | MetadataKey.completeCount) {
    const updates = getRequeueUpdates(keys, metadataKey);

    await stop();

    await update(queueRef, updates);

    return { success: true, message: `${updates.length} errored tasks reqeueued` };
  }

  async function requeueByState(taskState: TaskState.complete | TaskState.error) {
    const metadataKey = taskState === TaskState.complete ? MetadataKey.completeCount : MetadataKey.errorCount;

    await stop();

    await pageThroughTasks({
      batchSize: 3,
      callback: async (queueTasks: QueueTasks) => {
        const keys = Object.keys(queueTasks);
        const updates = getRequeueUpdates(keys, metadataKey);

        await update(queueRef, updates);

        return { success: true, message: `${updates.length} errored tasks reqeueued` };
      },
      taskState,
      tasksRef,
    });
  }

  function getRequeueUpdates(keys: string[], metadataKey: MetadataKey.errorCount | MetadataKey.completeCount) {
    return keys.reduce(
      (acc, key) => {
        acc[`${QueueKey.task}/${key}/${TaskKey.state}`] = TaskState.waiting;
        acc[`${QueueKey.task}/${key}/${TaskKey.started}`] = null;
        acc[`${QueueKey.task}/${key}/${TaskKey.completed}`] = null;

        return acc;
      },
      {
        [`${QueueKey.metadata}/${metadataKey}`]: increment(-keys.length),
        [`${QueueKey.metadata}/${MetadataKey.waitingCount}`]: increment(keys.length),
      } as Record<string, TaskState | null | ReturnType<typeof increment>>
    );
  }

  return {
    add,
    empty,
    stop,
    start,

    metadataRef,
    tasksRef,

    requeueByKey,
    requeueByState,
  };
}
