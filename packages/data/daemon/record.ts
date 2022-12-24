import { firestoreDate } from '../firestore';
import { z } from 'zod';

export enum DaemonRecordKey {
  directory = 'directory',
  updated = 'updated',
}

export const daemonRecord = z.object({
  [DaemonRecordKey.directory]: z.string(),
  [DaemonRecordKey.updated]: firestoreDate.default(() => new Date()),
});
export type DaemonRecord = z.infer<typeof daemonRecord>;
