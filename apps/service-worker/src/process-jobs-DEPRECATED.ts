import { Database, limitToLast, onChildAdded, onValue, query, ref, update } from 'firebase/database';
import {
  ProcessingJobRecord,
  ProcessingJobRecordTuple,
  ProcessingKey,
  ProcessingStage,
  getProcessingJobRefPath,
  getProcessingStageRefPath,
  processingTaskRecordSchema,
} from 'data/processing';

interface ProcessJobsArgs {
  database: Database;
  queueNextMediaItems: () => Promise<number>;
  syncJobId: string;
  userId: string;
  limit?: number;
}

export function processJobs({ database, limit = 1, queueNextMediaItems, syncJobId, userId }: ProcessJobsArgs) {
  const readyJobsRef = ref(database, getProcessingStageRefPath({ stage: ProcessingStage.active, syncJobId, userId }));
  const lastJobQuery = query(readyJobsRef, limitToLast(limit));
  let pages = 0;

  return onValue(lastJobQuery, (snapshot) => {
    const val = snapshot.val() as { [key: string]: ProcessingJobRecord };
    const jobs: ProcessingJobRecordTuple[] = val
      ? Object.entries(val).map(([key, j]) => [
          key,
          processingTaskRecordSchema.parse({
            [ProcessingKey.mediaItem]: j.mediaItem,
            [ProcessingKey.isActive]: j.isActive,
            [ProcessingKey.created]: new Date(j.created),
            [ProcessingKey.started]: j.started ? new Date(j.started) : undefined,
            [ProcessingKey.completed]: j.completed ? new Date(j.completed) : undefined,
          }),
        ])
      : ([] as ProcessingJobRecordTuple[]);
    const inactiveJobs = jobs.filter(([, j]) => j?.[ProcessingKey.isActive] === false);

    // TODO: Figure out why this is an infinite loop

    // inactiveJobs.forEach(([jobId, job]) => {
    //   if (jobId && job) {
    //     console.log('processing...', jobId);

    //     processJob({ database, job, jobId, syncJobId, userId });
    //   }
    // });

    if (!jobs.length) {
      if (pages < 1) {
        console.log('queuing next media items.');
        queueNextMediaItems();
        pages++;
      } else {
        console.log('processing first page only for now');
      }
    }
  });
}

async function processJob({
  database,
  job,
  jobId,
  syncJobId,
  userId,
}: {
  database: Database;
  job: ProcessingJobRecord;
  jobId: string;
  syncJobId: string;
  userId: string;
}) {
  return new Promise<void>(async (resolve) => {
    const activeJobPath = getProcessingJobRefPath({ jobId, stage: ProcessingStage.active, syncJobId, userId });
    const completeJobPath = getProcessingJobRefPath({ jobId, stage: ProcessingStage.complete, syncJobId, userId });
    const errorJobPath = getProcessingJobRefPath({ jobId, stage: ProcessingStage.error, syncJobId, userId });
    const activeJobRef = ref(database, activeJobPath);

    await update(activeJobRef, { [ProcessingKey.isActive]: true, [ProcessingKey.started]: new Date() });

    setTimeout(async () => {
      const isSuccess = Math.random() > 0.5;

      if (isSuccess) {
        await update(ref(database), {
          [activeJobPath]: null,
          [completeJobPath]: { ...job, [ProcessingKey.isActive]: false, [ProcessingKey.completed]: new Date() },
        });
      } else {
        await update(ref(database), {
          [activeJobPath]: null,
          [errorJobPath]: { ...job, [ProcessingKey.isActive]: false, [ProcessingKey.completed]: new Date() },
        });
      }

      console.log('processed', jobId, isSuccess);
      resolve();
    }, 500);
  });
}
