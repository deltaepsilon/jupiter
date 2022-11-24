import { QueueTasks, taskSchema } from '../schema';

import { DataSnapshot } from 'firebase/database';

export function mapTasks(dataSnapshot: DataSnapshot) {
  const data = dataSnapshot.val();

  switch (true) {
    case !data:
      return {};

    case !!data.state: {
      const key = dataSnapshot.key || '';
      const task = taskSchema.parse(data);

      return { [key]: task };
    }

    default:
      return Object.entries(dataSnapshot.val() || {}).reduce((acc, [key, value]) => {
        const task = taskSchema.parse(value);

        acc[key] = task;

        return acc;
      }, {} as QueueTasks);
  }
}
