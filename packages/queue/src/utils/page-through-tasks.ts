import { Callback, QueueTasks, TaskKey, TaskState } from '../schema';
import {
  DatabaseReference,
  equalTo,
  get,
  limitToFirst,
  orderByChild,
  orderByKey,
  query,
  startAfter,
} from 'firebase/database';

import { mapTasks } from './map-tasks';

export async function pageThroughTasks({
  batchSize,
  callback,
  startAfterKey,
  taskState,
  tasksRef,
}: {
  batchSize: number;
  callback: Callback;
  startAfterKey?: string;
  taskState: TaskState;
  tasksRef: DatabaseReference;
}) {
  /**
   * Firebase doesn't support pagination on two fields, so the first call can filter on equalTo(taskState),
   * but the subsequent calls must filter on startAfter(lastKey) and manually clean out tasks that don't match.
   */
  const tasksQuery = startAfterKey
    ? query(tasksRef, orderByKey(), limitToFirst(batchSize), startAfter(startAfterKey))
    : query(tasksRef, orderByChild(TaskKey.state), limitToFirst(batchSize), equalTo(taskState));
  const snapshot = await get(tasksQuery);
  const queueTasks = mapTasks(snapshot);
  const matchingTasks = Object.entries(queueTasks).reduce((acc, [key, task]) => {
    if (task.state === taskState) {
      acc[key] = task;
    }

    return acc;
  }, {} as QueueTasks);
  const existMatchingTasks = Object.keys(matchingTasks).length > 0;
  const lastKey = Object.keys(queueTasks).pop();
  const isLastPage = !lastKey;

  if (existMatchingTasks) {
    await callback(matchingTasks);
  }

  if (!isLastPage && lastKey) {
    await pageThroughTasks({ batchSize, callback, startAfterKey: lastKey, taskState, tasksRef });
  }
}
