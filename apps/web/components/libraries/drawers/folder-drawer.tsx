import { Box, Button, IconButton, SxProps, Typography } from '@mui/material';
import { FolderDataProvider, useFolderData } from 'web/contexts';
import { ModalDrawer, ModalDrawerFooter } from 'ui/components';

import { useModalState } from 'ui/hooks';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  folder: string;
  sx?: SxProps;
}

export function FolderDrawer({ children, disabled = false, folder, sx = {} }: Props) {
  const { isOpen, onOpen, onClose } = useModalState({ autoOpenHash: `folder-${folder}` });

  return (
    <>
      <ModalDrawer
        aria-describedby='folder details'
        aria-labelledby='folder details'
        isOpen={isOpen}
        onClose={onClose}
        title={`Folder details: ${folder}`}
      >
        <FolderDataProvider folder={folder}>
          <FolderDrawerContents />
        </FolderDataProvider>

        <ModalDrawerFooter>
          <Button onClick={onClose} variant='text'>
            Close
          </Button>
        </ModalDrawerFooter>
      </ModalDrawer>
      <Box onClick={onOpen} sx={{ ...sx, opacity: disabled ? 0.5 : 1, userSelect: disabled ? 'none' : 'all' }}>
        {children}
      </Box>
    </>
  );
}

function FolderDrawerContents() {
  const { folderData } = useFolderData();

  console.log(folderData);

  return <Box />;
}
