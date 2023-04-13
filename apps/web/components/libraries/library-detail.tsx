import { Box, Button, Typography } from '@mui/material';
import { Container, Link } from 'ui/components';
import { DaemonPanel, DesktopAppDownloadsDrawer } from 'web/components/daemon';
import { DaemonProvider, DirectoryProvider, useDaemon, useDirectory, useLibraries } from 'web/contexts';
import { DownloadLibraryPanel, ImportLibraryPanel } from './panels';
import { Library, LibraryTaskStatus } from 'data/library';
import { useDaemonRecord, useLibraryDownload, useLibraryImport } from 'web/hooks';
import { useEffect, useMemo, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { MAX_UNSUBCRIBED_COUNT } from 'data/library';
import { MessageType } from 'data/daemon';
import { WEB } from 'data/web';
import { formatDate } from 'ui/utils';
import { getDirectoryHandler } from 'web/components/daemon/handlers/directory-handler';
import { useAuth } from 'ui/contexts';
import { useFunctions } from 'ui/hooks';
import { useStripe } from 'web/hooks';

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
  const { isSubscriber, userId } = useAuth();
  const { actions: importActions, libraryImport } = useLibraryImport(libraryId);
  const { actions: downloadActions, downloadState } = useLibraryDownload(libraryId, library);
  const { directory } = useDirectory();
  const { refreshMediaItemStats } = useFunctions();
  const { isConnected: isDaemonConnected } = useDaemon();
  const { isRedirecting, redirectToSubscription } = useStripe();
  const isComplete = libraryImport?.status === LibraryTaskStatus.complete;
  const isRunning = libraryImport?.status === LibraryTaskStatus.running;
  const hasLibraryRecords = !!libraryImport?.count;
  const isDownloadActive = isDaemonConnected && hasLibraryRecords;

  useEffect(() => {
    if (isComplete && userId) {
      refreshMediaItemStats({ libraryId, userId });
    }
  }, [isComplete, libraryId, refreshMediaItemStats, userId]);

  return (
    <Container
      sx={{
        display: 'grid',
        gridGap: ['2rem'],
        maxWidth: 500,
        paddingTop: 0,
      }}
    >
      <Link button href={WEB.ROUTES.PHOTOS}>
        <Button startIcon={<ArrowBackIcon />}>Back</Button>
      </Link>
      <Box>
        <Typography
          sx={{ textTransform: 'capitalize' }}
          title={`"${library.name}" is your library's codename.`}
          variant='h2'
        >
          {library.name}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridGap: ['4rem', '5rem'],
        }}
      >
        <Box>
          <Step>
            <Typography variant='h4'>Tutorial</Typography>

            <iframe
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
              frameBorder='0'
              height='315'
              src='https://www.youtube.com/embed/3ui5PS7nP-Q'
              title='YouTube video player'
              width='500'
            ></iframe>
          </Step>
          {!isSubscriber && (
            <Step>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gridGap: 16,
                  marginBottom: [2, 0],
                }}
              >
                <Typography sx={{ color: 'var(--color-blue)' }} variant='h4'>
                  Free Tier
                </Typography>

                <LoadingButton loading={isRedirecting} onClick={redirectToSubscription} variant='contained'>
                  Subscribe
                </LoadingButton>
              </Box>

              <Typography sx={{ strong: { color: 'var(--color-blue)' } }} variant='body1'>
                Your first <strong>{MAX_UNSUBCRIBED_COUNT}</strong> media items are free!
              </Typography>
            </Step>
          )}
          {isComplete ? (
            <Step>
              <Typography sx={{ paddingBottom: 1 }} variant='h4'>
                1. Import records: complete
              </Typography>
              <Typography variant='body1'>
                Congratulations! Your records are current as of{' '}
                <span>{formatDate(libraryImport?.updated, 'MMM d, yyyy HH:mm')}</span>.
              </Typography>
            </Step>
          ) : hasLibraryRecords ? (
            <Step>
              {isRunning ? (
                <Typography variant='h4'>1. Import records: in progress</Typography>
              ) : (
                <Typography variant='h4'>1. Import records: paused</Typography>
              )}

              <Typography variant='body1'>
                You&apos;ve imported enough media to start downloading your files!
              </Typography>
            </Step>
          ) : (
            <Step>
              <Typography sx={{ paddingBottom: 1 }} variant='h4'>
                <strong>First, </strong> import your library
              </Typography>
              <Typography variant='body1'>It&apos;s likely 10k+ records, but that&apos;s ok!</Typography>
            </Step>
          )}

          <ImportLibraryPanel actions={importActions} libraryId={libraryId} libraryImport={libraryImport} />
        </Box>

        <Box sx={{ pointerEvents: hasLibraryRecords ? 'all' : 'none', opacity: hasLibraryRecords ? 1 : 0.5 }}>
          <Step>
            <Typography variant='h4'>2. Run the Desktop App</Typography>
            <Typography sx={{ a: { textDecoration: 'underline' } }} variant='body1'>
              The Desktop App manages local files on your hard drive.
            </Typography>
            <Box sx={{ paddingY: 2, textAlign: 'right' }}>
              <DesktopAppDownloadsDrawer>
                <Button variant={isDaemonConnected ? 'outlined' : 'contained'}>Get Desktop App</Button>
              </DesktopAppDownloadsDrawer>
            </Box>
          </Step>

          <DaemonPanel />
        </Box>

        <Box sx={{ pointerEvents: isDownloadActive ? 'all' : 'none', opacity: isDownloadActive ? 1 : 0.5 }}>
          <Step>
            <Typography variant='h4'>3. Download to your hard drive</Typography>
            <Typography sx={{ a: { textDecoration: 'underline' } }} variant='body1'>
              Back up large libraries to a dedicated hard drive or NAS. <br />
              <br />
              We recommend using a{' '}
              <Link blank href='https://amzn.to/3J20oty'>
                Synology NAS
              </Link>{' '}
              with{' '}
              <Link blank href='https://www.synology.com/en-global/DSM70/SynologyPhotos'>
                Synology Photos
              </Link>
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
      <Box sx={{ width: '100%' }}>{children}</Box>
    </Box>
  );
}
