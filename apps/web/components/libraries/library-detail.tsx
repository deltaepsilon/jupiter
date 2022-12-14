import { Box, Typography } from '@mui/material';
import { DaemonProvider, DirectoryProvider, useDaemon, useDirectory, useLibraries } from 'web/contexts';
import { DownloadLibraryPanel, ImportLibraryPanel } from './panels';
import { Library, LibraryTaskStatus } from 'data/library';
import { useDaemonRecord, useLibraryDownload, useLibraryImport } from 'web/hooks';

import { Container } from 'ui/components';
import { DaemonPanel } from 'web/components/daemon';
import { MessageType } from 'data/daemon';
import { formatDate } from 'ui/utils';
import { getDirectoryHandler } from 'web/components/daemon/handlers/directory-handler';
import { useMemo } from 'react';

export function LibraryDetail() {
  const { libraries } = useLibraries();
  const [libraryId, library] = libraries[0];
  const { daemonRecord, isLoading } = useDaemonRecord(libraryId);
  const handlers = useMemo(
    () =>
      daemonRecord ? [{ type: MessageType.directory, handler: getDirectoryHandler(libraryId, daemonRecord) }] : [],
    [daemonRecord, libraryId]
  );

  return isLoading ? null : (
    <DaemonProvider handlers={handlers}>
      <DirectoryProvider libraryId={libraryId}>
        <LibraryDetailConnected library={library} libraryId={libraryId} />
      </DirectoryProvider>
    </DaemonProvider>
  );
}

function LibraryDetailConnected({ library, libraryId }: { library: Library; libraryId: string }) {
  const { actions: importActions, libraryImport } = useLibraryImport(libraryId);
  const { actions: downloadActions, downloadState } = useLibraryDownload(libraryId, library);
  const { directory } = useDirectory();
  const { isConnected: isDaemonConnected } = useDaemon();
  const isComplete = libraryImport?.status === LibraryTaskStatus.complete;
  const isRunning = libraryImport?.status === LibraryTaskStatus.running;
  const hasLibraryRecords = !!libraryImport?.count;

  return (
    <Container
      sx={{
        display: 'grid',
        gridGap: ['2rem'],
        maxWidth: 500,
        paddingTop: 0,
      }}
    >
      <Typography sx={{ textTransform: 'capitalize' }} variant='h2'>
        {library.name}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridGap: ['4rem', '5rem'],
        }}
      >
        <Box>
          {isComplete ? (
            <Step>
              <Typography sx={{ paddingBottom: 1 }} variant='h4'>
                Import complete
              </Typography>
              <Typography variant='body1'>
                Congratulations! Your records are current as of{' '}
                <span>{formatDate(libraryImport?.updated, 'MMM d, yyyy HH:mm')}</span>.
              </Typography>
            </Step>
          ) : hasLibraryRecords ? (
            <Step>
              {isRunning ? (
                <Typography variant='h4'>Import in progress</Typography>
              ) : (
                <Typography variant='h4'>Import paused</Typography>
              )}

              <Typography variant='body1'>You can start processing at any time.</Typography>
            </Step>
          ) : (
            <Step>
              <Typography sx={{ paddingBottom: 1 }} variant='h4'>
                <strong>First, </strong> import your library
              </Typography>
              <Typography variant='body1'>It&apos;s likely 10k+ records, but that&apos;s ok!</Typography>
            </Step>
          )}

          <ImportLibraryPanel actions={importActions} libraryImport={libraryImport} />
        </Box>

        <Box sx={{ pointerEvents: hasLibraryRecords ? 'all' : 'none', opacity: hasLibraryRecords ? 1 : 0.5 }}>
          <Step>
            <Typography variant='h4'>Connect local app</Typography>
            <Typography sx={{ a: { textDecoration: 'underline' } }} variant='body1'>
              The local app is a lightweight, open-source application that runs on your computer. We&apos;ll use it
              manage local files.
            </Typography>
          </Step>

          <DaemonPanel />
        </Box>

        <Box sx={{ pointerEvents: isDaemonConnected ? 'all' : 'none', opacity: isDaemonConnected ? 1 : 0.5 }}>
          <Step>
            <Typography variant='h4'>Download to your hard drive</Typography>
            <Typography sx={{ a: { textDecoration: 'underline' } }} variant='body1'>
              Large libraries should be backed up to a dedicated hard drive or NAS. We recommend Synology because of the
              excellent{' '}
              <a
                href='https://www.synology.com/en-global/DSM70/SynologyPhotos'
                rel='noopener noreferrer'
                target='_blank'
              >
                Synology Photos
              </a>
              .
            </Typography>
          </Step>

          <DownloadLibraryPanel
            actions={downloadActions}
            directory={directory}
            downloadState={downloadState}
            libraryId={libraryId}
          />
        </Box>
      </Box>
    </Container>
  );
}

function Step({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingBottom: 4,
        h4: {
          paddingBottom: 1,
        },
      }}
    >
      <Box>{children}</Box>
    </Box>
  );
}
