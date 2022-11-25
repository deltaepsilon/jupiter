import { Box, Button } from '@mui/material';
import { FormEventHandler, useCallback, useState } from 'react';
import { ModalDrawer, ModalDrawerFooter, useModalDrawer } from 'ui/components';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { CreateSyncTaskForm } from './create-sync-task-form';
import { SyncTask } from 'data/sync';
import { stopPropagation } from 'ui/utils';
import { useAuth } from 'ui/contexts';
import { useModalState } from 'ui/hooks';
import { useSyncTasks } from 'web/contexts/sync-tasks-context';

export function CreateSyncTaskButton() {
  const { createSyncTask } = useSyncTasks();
  const [syncTask, setSyncTask] = useState<SyncTask>();
  const { isOpen, onOpen, onClose } = useModalState({ autoOpenHash: 'create-sync-task' });
  const onSubmitCallback = useCallback(
    (e?: Event) => {
      e?.preventDefault();

      syncTask && createSyncTask(syncTask);

      onClose();
    },
    [createSyncTask, onClose, syncTask]
  );
  const onSyncTaskChange = useCallback((syncTask?: SyncTask) => setSyncTask(syncTask), []);

  return (
    <>
      <ModalDrawer
        aria-describedby='create sync task'
        aria-labelledby='create sync task'
        isOpen={isOpen}
        onClose={onClose}
        title='Create Sync Task'
      >
        <Box onClick={stopPropagation} sx={{ padding: [1, 2] }}>
          <form onSubmit={onSubmitCallback as unknown as FormEventHandler}>
            <CreateSyncTaskForm onSyncTaskChange={onSyncTaskChange} />
            <Footer canSave={!!syncTask} onSubmitCallback={onSubmitCallback} />
          </form>
        </Box>
      </ModalDrawer>

      <Button onClick={onOpen} startIcon={<CloudDownloadIcon />} variant='contained'>
        Create Sync Task
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
