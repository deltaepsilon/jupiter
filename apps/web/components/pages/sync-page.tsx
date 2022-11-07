import { Box, CircularProgress, Typography } from '@mui/material';
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
    <Box>
      <Typography>Empty</Typography>
      <CreateSyncJobButton />
    </Box>
  );
}
