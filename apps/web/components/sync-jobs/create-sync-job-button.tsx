import { Box, Button } from '@mui/material';
import { ModalDrawer, ModalDrawerFooter, useModalDrawer } from 'ui/components';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { stopPropagation } from 'ui/utils';
import { useCallback } from 'react';
import { useModalState } from 'ui/hooks';

export function CreateSyncJobButton() {
  const { isOpen, onOpen, onClose } = useModalState();
  const onSubmitCallback = useCallback(() => {
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
          hey
        </Box>

        <Footer canSave={true} onSubmitCallback={onSubmitCallback} />
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
