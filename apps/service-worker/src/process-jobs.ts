import { Database, onChildAdded, onValue, ref } from 'firebase/database';
import { ProcessingStage, getProcessingJobsRefPath, processingJobRecordSchema } from 'data/processing';

interface Args {
  database: Database;
  syncJobId: string;
  userId: string;
}

export function processJobs({ database, syncJobId, userId }: Args) {
  const processingJobsRef = ref(database, getProcessingJobsRefPath(userId, syncJobId));

  onChildAdded(processingJobsRef, (data) => {
    const key = data.key;
    const job = data.val();

    console.log({ key, job });
  });
}
