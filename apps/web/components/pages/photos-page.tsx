import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { LibrariesProvider, useLibraries } from 'web/contexts/libraries-context';

import { Container } from 'ui/components';
import { CreateSyncTaskButton } from 'web/components/sync-tasks';
import { LibrariesList } from 'web/components/libraries';
import { useAuth } from 'ui/contexts';

export function PhotosPage() {
  const { user } = useAuth({ forceRedirect: true });
  const userId = user?.uid;

  return userId ? (
    <LibrariesProvider userId={user?.uid}>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <PhotosPageConnected />
      </Container>
    </LibrariesProvider>
  ) : null;
}

function PhotosPageConnected() {
  const { isLoading } = useLibraries();

  switch (true) {
    case isLoading:
      return <CircularProgress sx={{ alignSelf: 'center' }} />;

    default:
      return <LibrariesList />;
  }
}

function LibrariesEmptyState() {
  return (
    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', gridGap: 1, width: 400 }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h4'>No Active Tasks</Typography>
      </Box>
      <CreateSyncTaskButton />
    </Paper>
  );
}
