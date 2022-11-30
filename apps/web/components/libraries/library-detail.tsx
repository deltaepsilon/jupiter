import { Box, Button, Typography } from '@mui/material';
import { LibrariesProvider, useLibraries } from 'web/contexts/libraries-context';

import { Container } from 'ui/components';
import { LibraryImportStatus } from 'data/library';
import { useLibraryImport } from 'web/hooks/use-library-import';

export function LibraryDetail() {
  const { libraries } = useLibraries();
  const [libraryId, library] = libraries[0];
  const { libraryImport, isLoading, start, pause, cancel, destroy } = useLibraryImport(libraryId);
  const isRunning = libraryImport?.status === LibraryImportStatus.running;
  const isPaused = libraryImport?.status === LibraryImportStatus.paused;
  const isCanceled = libraryImport?.status === LibraryImportStatus.canceled;
  const isComplete = libraryImport?.status === LibraryImportStatus.complete;
  const isEmpty = !libraryImport;

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box>
        <Typography sx={{ span: { color: 'var(--color-lava-orange)' } }} variant='h4'>
          Time to <span>organize</span>. <br />
          Stop staring. Click the button.
        </Typography>
        <Typography>status: {libraryImport?.status}</Typography>
        <Typography>count: {libraryImport?.count}</Typography>
        <Typography>updated: {libraryImport?.updated.toISOString()}</Typography>
        <Box sx={{ textAlign: 'right', paddingTop: 2 }}>
          <Button disabled={!isEmpty || isLoading} onClick={() => start()} variant='contained'>
            Import me
          </Button>
          <Button disabled={isComplete || isRunning || isEmpty} onClick={() => start()} variant='contained'>
            Restart me
          </Button>
          <Button disabled={isEmpty || !isRunning} onClick={() => pause()} variant='contained'>
            Pause me
          </Button>
          <Button disabled={isEmpty || !isPaused} onClick={() => cancel()} variant='contained'>
            Cancel me
          </Button>
          <Button disabled={isEmpty || !isPaused} onClick={() => destroy()} variant='contained'>
            Destroy me
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography variant='h4'>Library</Typography>
        <Typography variant='h4'>Note: Keep this tab open to ensure processing.</Typography>
      </Box>
    </Container>
  );
}
