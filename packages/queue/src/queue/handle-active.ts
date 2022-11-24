import { Callback, LogKey, QueueKey, TaskKey, TaskState, errorSchema } from '../schema';
import { DataSnapshot, DatabaseReference, push, update } from 'firebase/database';

import { mapTasks } from '../utils';

export async function handleActive({
  callback,
  dataSnapshot,
  queueRef,
}: {
  dataSnapshot: DataSnapshot;
  callback: Callback;
  queueRef: DatabaseReference;
}) {
  const started = Date.now();
  const data = mapTasks(dataSnapshot);
  const task = Object.values(data)[0] ?? null;

  try {
    const { success, message } = await callback(data);

    if (!success) {
      throw new Error(message);
    } else {
      await update(dataSnapshot.ref, {
        [TaskKey.message]: message,
        [TaskKey.state]: TaskState.complete,
        [TaskKey.started]: started,
        [TaskKey.completed]: Date.now(),
      });

      return { success, message };
    }
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(message);
    }

    update(dataSnapshot.ref, {
      [TaskKey.message]: message,
      [TaskKey.state]: TaskState.error,
      [TaskKey.started]: started,
      [TaskKey.errored]: Date.now(),
    });

    await update(queueRef, {
      [`${QueueKey.logs}/${dataSnapshot.key}/${LogKey.task}`]: task,
      [`${QueueKey.logs}/${dataSnapshot.key}/${LogKey.errors}/${push(queueRef).key}`]: errorSchema.parse({
        created: new Date(),
        message: message,
      }),
    });

    return { success: false, message };
  }
}
