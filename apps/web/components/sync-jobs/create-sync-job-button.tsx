import { Box, Button } from '@mui/material';
import { FormEventHandler, useCallback, useState } from 'react';
import { ModalDrawer, ModalDrawerFooter, useModalDrawer } from 'ui/components';
import { SyncJobsProvider, useSyncJobs } from 'web/contexts/sync-jobs-context';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { CreateSyncJobForm } from './create-sync-job-form';
import { SyncJob } from 'data/sync';
import { stopPropagation } from 'ui/utils';
import { useAuth } from 'ui/contexts';
import { useModalState } from 'ui/hooks';

export function CreateSyncJobButton() {
  const { createSyncJob } = useSyncJobs();
  const [syncJob, setSyncJob] = useState<SyncJob>();
  const { isOpen, onOpen, onClose } = useModalState({ autoOpenHash: 'create-sync-job' });
  const onSubmitCallback = useCallback(
    (e?: Event) => {
      e?.preventDefault();

      syncJob && createSyncJob(syncJob);

      onClose();
    },
    [createSyncJob, onClose, syncJob]
  );
  const onSyncJobChange = useCallback((syncJob?: SyncJob) => setSyncJob(syncJob), []);

  return (
    <>
      <ModalDrawer
        aria-describedby='create sync job'
        aria-labelledby='create sync job'
        isOpen={isOpen}
        onClose={onClose}
        title='Create Sync Job'
      >
        <Box onClick={stopPropagation} sx={{ padding: [1, 2] }}>
          <form onSubmit={onSubmitCallback as unknown as FormEventHandler}>
            <CreateSyncJobForm onSyncJobChange={onSyncJobChange} />
            <Footer canSave={!!syncJob} onSubmitCallback={onSubmitCallback} />
          </form>
        </Box>
      </ModalDrawer>

      <Button onClick={onOpen} startIcon={<CloudDownloadIcon />} variant='contained'>
        Create Sync Job
      </Button>
    </>
  );
}

function Footer({ canSave, onSubmitCallback }: { canSave: boolean; onSubmitCallback: () => void }) {
  const { onClose } = useModalDrawer();

  const onSubmit = useCallback(() => {
    onSubmitCallback();
  }, [onSubmitCallback]);

  return (
    <ModalDrawerFooter>
      <Button disabled={!canSave} onClick={onSubmit} type='submit' variant='contained'>
        Save
      </Button>

      <Button onClick={onClose} variant='text'>
        Cancel
      </Button>
    </ModalDrawerFooter>
  );
}
