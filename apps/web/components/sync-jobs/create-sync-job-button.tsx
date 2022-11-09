import { Box, Button } from '@mui/material';
import { FormEvent, FormEventHandler, useCallback } from 'react';
import { ModalDrawer, ModalDrawerFooter, useModalDrawer } from 'ui/components';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { CreateSyncJobForm } from './create-sync-job-form';
import { stopPropagation } from 'ui/utils';
import { useModalState } from 'ui/hooks';

export function CreateSyncJobButton() {
  const { isOpen, onOpen, onClose } = useModalState();
  const onSubmitCallback = useCallback((e?: Event) => {
    e?.preventDefault();
    console.log('onSubmitCallback');
  }, []);

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
            <CreateSyncJobForm />
            <Footer canSave={true} onSubmitCallback={onSubmitCallback} />
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
      <Button disabled={!canSave} onClick={onSubmit} variant='contained'>
        Save
      </Button>

      <Button onClick={onClose} variant='text'>
        Cancel
      </Button>
    </ModalDrawerFooter>
  );
}
