import { Box, Button, LinearProgress, List, ListItem, Paper, Typography } from '@mui/material';
import {
  DatabaseReference,
  getDatabase,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onValue,
  ref,
} from 'firebase/database';
import {
  MetadataKey,
  Queue,
  QueueMetadata,
  QueueTasks,
  TaskState,
  metadataSchema,
  taskSchema,
} from '@jupiter/firebase-queue';
import { useCallback, useEffect, useMemo, useState } from 'react';

import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import PendingIcon from '@mui/icons-material/Pending';
import { useAuth } from 'ui/contexts';
import { useFirebase } from 'ui/contexts';

const QUEUE_SIZE = 11;
const BATCH_SIZE = 6;

interface FakeData {
  name: string;
}

export default function QueuePage() {
  const queue = useQueue();
  const { metadata, tasks } = useData({ metadataRef: queue?.metadataRef, tasksRef: queue?.tasksRef });

  return (
    <Box>
      <Button onClick={() => queue?.add(generateFakeData())}>Add</Button>
      <Button onClick={() => queue?.stop()}>Stop</Button>
      <Button onClick={() => queue?.start()}>Start</Button>
      <Button onClick={() => queue?.empty()}>Empty</Button>
      <Button onClick={() => queue?.requeueByState(TaskState.error)}>Requeue Errored</Button>

      <Paper elevation={0} sx={{ maxWidth: 500, paddingX: 0 }}>
        <Box
          sx={{ display: 'grid', gridTemplateColumns: '1fr 2rem', alignItems: 'center', paddingX: 2, paddingBottom: 2 }}
        >
          <Typography variant='h6'>Progress</Typography>
          <Box>
            {metadata?.isPaused ? (
              <HourglassTopIcon sx={{ color: 'var(--color-pastel-blue)' }} />
            ) : (
              <PendingIcon sx={{ color: 'var(--color-acid-green)' }} />
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 3rem 1fr 3rem',
            alignItems: 'center',
            border: '1px solid var(--color-dark-gray)',
            borderWidth: '1px 0',
            padding: 2,
          }}
        >
          <Typography variant='subtitle2'>Active:</Typography>
          <Typography variant='subtitle2'>{metadata?.activeCount || 0}</Typography>
          <Typography variant='subtitle2'>Errors:</Typography>
          <Typography variant='subtitle2'>{metadata?.errorCount || 0}</Typography>
          <Typography variant='subtitle2'>Waiting:</Typography>
          <Typography variant='subtitle2'>{metadata?.waitingCount || 0}</Typography>
          <Typography variant='subtitle2'>Complete:</Typography>
          <Typography variant='subtitle2'>{metadata?.completeCount || 0}</Typography>
          <Typography variant='subtitle2'>Total:</Typography>
          <Typography variant='subtitle2'>{metadata?.count || 0}</Typography>
        </Box>

        <List>
          {Object.entries(tasks || {}).map(([key, task]) => {
            const isError = task.state === TaskState.error;

            return task?.data ? (
              <ListItem
                key={key}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2rem 8rem 1fr 8rem',
                  alignItems: 'center',
                  paddingY: 0,
                  paddingX: 2,
                }}
              >
                <StateIcon state={task.state} />
                <Typography variant='subtitle2'>{task.data.name}</Typography>
                <Typography variant='subtitle2'>{task.message}</Typography>
                <Button
                  onClick={() => queue?.requeueByKey([key], MetadataKey.errorCount)}
                  sx={{ visibility: isError ? 'visible' : 'hidden' }}
                >
                  Requeue
                </Button>
              </ListItem>
            ) : null;
          })}
        </List>
      </Paper>
    </Box>
  );
}

function StateIcon({ state }: { state: TaskState }) {
  switch (state) {
    case TaskState.error:
      return <ErrorOutlineIcon sx={{ color: 'var(--color-lava-orange)' }} />;

    case TaskState.waiting:
      return <HourglassTopIcon sx={{ color: 'var(--color-pastel-blue)' }} />;

    case TaskState.active:
      return <PendingIcon sx={{ color: 'var(--color-acid-green)' }} />;

    case TaskState.complete:
      return <DoneIcon sx={{ color: 'var(--color-gentian-blue-metallic)' }} />;

    default:
      return null;
  }
}

function generateFakeData(): FakeData[] {
  return Array.from(Array(QUEUE_SIZE).keys()).map(() => ({ name: Math.random().toString(36).substring(2, 15) }));
}

function useQueue() {
  const [queue, setQueue] = useState<ReturnType<typeof Queue<FakeData>> | null>(null);
  const { app } = useFirebase();
  const { user } = useAuth();
  const queueRef = useMemo(
    () => (app && user?.uid ? ref(getDatabase(app), `queue-test/${user?.uid}`) : null),
    [app, user?.uid]
  );

  useEffect(() => {
    if (queueRef) {
      const q = Queue<FakeData>({
        batchSize: BATCH_SIZE,
        callback: async () => {
          return new Promise((resolve) => {
            const random = Math.random();
            const timeout = random * 1000 * 2;
            const success = random > 0.5;

            setTimeout(() => {
              resolve({ success, message: `r: ${Math.round(random * 1000) / 1000}` });
            }, timeout);
          });
        },
        ref: queueRef,
      });

      setQueue(q);

      return () => {
        q.stop();
      };
    }
  }, [queueRef]);

  return queue;
}

function useData({ metadataRef, tasksRef }: { metadataRef?: DatabaseReference; tasksRef?: DatabaseReference }) {
  const [metadata, setMetadata] = useState<QueueMetadata>();
  const [tasks, setTasks] = useState<QueueTasks>();

  useEffect(() => {
    metadataRef &&
      onValue(metadataRef, (snapshot) => {
        setMetadata(metadataSchema.parse(snapshot.val() || {}));
      });
  }, [metadataRef]);

  useEffect(() => {
    if (tasksRef) {
      onChildAdded(tasksRef, (snapshot) => {
        const key = snapshot.key;
        const task = taskSchema.parse(snapshot.val());

        if (key) {
          setTasks((tasks) => ({ ...tasks, [key]: task }));
        }
      });

      onChildChanged(tasksRef, (snapshot) => {
        const key = snapshot.key;
        const task = taskSchema.parse(snapshot.val());

        if (key) {
          setTasks((tasks) => ({ ...tasks, [key]: task }));
        }
      });

      onChildRemoved(tasksRef, (snapshot) => {
        const key = snapshot.key;

        if (key) {
          setTasks((tasks) => {
            const { [key]: _, ...rest } = tasks || {};

            return rest;
          });
        }
      });
    }
  }, [tasksRef]);

  return { metadata, tasks };
}
