import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { SyncTasksProvider, useSyncTasks } from 'web/contexts/sync-tasks-context';

import { Container } from 'ui/components';
import { CreateSyncTaskButton } from 'web/components/sync-tasks';
import { SyncTasksList } from 'web/components/sync-tasks';
import { useAuth } from 'ui/contexts';

export function SyncPage() {
  const { user } = useAuth({ forceRedirect: true });
  const userId = user?.uid;

  return userId ? (
    <SyncTasksProvider userId={user?.uid}>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <SyncPageConnected />
      </Container>
    </SyncTasksProvider>
  ) : null;
}

function SyncPageConnected() {
  const { isLoading, syncTaskRecords } = useSyncTasks();

  switch (true) {
    case isLoading:
      return <CircularProgress sx={{ alignSelf: 'center' }} />;

    case !syncTaskRecords:
      return <SyncTasksEmptyState />;

    default:
      return syncTaskRecords ? <SyncTasksList syncTaskRecords={syncTaskRecords} /> : null;
  }
}

function SyncTasksEmptyState() {
  return (
    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', gridGap: 1, width: 400 }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h4'>No Active Tasks</Typography>
      </Box>
      <CreateSyncTaskButton />
    </Paper>
  );
}
