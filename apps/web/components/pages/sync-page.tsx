import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { SyncJobsProvider, useSyncJobs } from 'web/contexts/sync-jobs-context';

import { Container } from 'ui/components';
import { CreateSyncJobButton } from 'web/components/sync-jobs';
import { useAuth } from 'ui/contexts';

export function SyncPage() {
  const { user } = useAuth({ forceRedirect: true });
  const userId = user?.uid;

  return userId ? (
    <SyncJobsProvider userId={user?.uid}>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <SyncPageConnected />
      </Container>
    </SyncJobsProvider>
  ) : null;
}

function SyncPageConnected() {
  const { isLoading, syncJobs } = useSyncJobs();

  console.log({ isLoading, syncJobs });

  switch (true) {
    case isLoading:
      return <CircularProgress sx={{ alignSelf: 'center' }} />;

    case !syncJobs.length:
      return <SyncJobsEmptyState />;

    default:
      return <CreateSyncJobButton />;
  }
}

function SyncJobsEmptyState() {
  return (
    <Paper elevation={-1} sx={{ display: 'flex', flexDirection: 'column', gridGap: 1, width: 400 }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h4'>No Active Jobs</Typography>
      </Box>
      <CreateSyncJobButton />
    </Paper>
  );
}
