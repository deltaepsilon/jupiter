import { Box, Button, IconButton, List, ListItem, SxProps, TextField, Typography } from '@mui/material';
import { ModalDrawer, ModalDrawerFooter, useModalDrawer } from 'ui/components';
import { useCallback, useEffect, useState } from 'react';

import FileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import { ListDirectoriesData } from 'data/daemon';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useDirectory } from 'web/contexts';
import { useModalState } from 'ui/hooks';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  directory?: string;
  libraryId: string;
  sx?: SxProps;
}

export function DirectoryPicker({ children, disabled = false, directory = '', libraryId, sx = {} }: Props) {
  const [directoryInput, setDirectoryInput] = useState<string>(directory);
  const [currentDirectory, setCurrentDirectory] = useState<ListDirectoriesData['currentDirectory']>(directory);
  const [childDirectories, setChildDirectories] = useState<ListDirectoriesData['childDirectories']>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useModalState({ autoOpenHash: 'directory-picker' });
  const { isConnected, listDirectories, setDirectory } = useDirectory();
  const updateDirectories = useCallback(
    async (navigate?: string) => {
      const { payload } = await listDirectories({
        currentDirectory,
        navigate,
      });

      if (payload.data) {
        setCurrentDirectory(payload.data.currentDirectory);
        setDirectoryInput(payload.data.currentDirectory);
        setChildDirectories(payload.data.childDirectories);
      } else if (payload.error) {
        alert(payload.error);
        setCurrentDirectory('');
      }
    },
    [currentDirectory, listDirectories]
  );
  const getNavigate = useCallback((navigate: string) => () => updateDirectories(navigate), [updateDirectories]);
  const onChildClick = useCallback(async () => {
    if (!disabled) {
      setIsLoading(true);
      onOpen();

      setIsLoading(false);
    }
  }, [disabled, onOpen]);
  const onChoose = useCallback(async () => {
    await setDirectory(currentDirectory);

    onClose();
  }, [currentDirectory, onClose, setDirectory]);

  useEffect(() => {
    isOpen && isConnected && updateDirectories();
  }, [isConnected, isOpen, updateDirectories]);

  useEffect(() => {
    setDirectoryInput(directory);
    setCurrentDirectory(directory);
  }, [directory]);

  return (
    <>
      <ModalDrawer
        aria-describedby='pick a local directory'
        aria-labelledby='pick a local directory'
        isOpen={isOpen && !isLoading}
        onClose={onClose}
        title='Pick a local directory to sync'
      >
        <Box sx={{ display: 'flex', gridGap: 8, padding: 2 }}>
          <TextField
            label='directory'
            onChange={(e) => setDirectoryInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setCurrentDirectory(directoryInput)}
            sx={{ width: '100%' }}
            value={directoryInput}
          />
          <Button onClick={() => setCurrentDirectory(directoryInput)}>Navigate</Button>
        </Box>
        <List sx={{ button: { marginRight: 2 } }}>
          <ListItem>
            <IconButton onClick={getNavigate('..')}>
              <NavigateBeforeIcon />
            </IconButton>

            <Typography>Back</Typography>
          </ListItem>
          {childDirectories.map((childDirectory) => (
            <ListItem
              key={childDirectory.name}
              onClick={getNavigate(childDirectory.name)}
              sx={{
                cursor: 'pointer',
                paddingLeft: 4,
                opacity: childDirectory.isDirectory ? 1 : 0.5,
                pointerEvents: childDirectory.isDirectory ? 'all' : 'none',
              }}
            >
              <IconButton sx={{ visibility: childDirectory.isDirectory ? 'visible' : 'hidden' }}>
                <NavigateNextIcon />
              </IconButton>
              {childDirectory.isDirectory ? <FolderIcon /> : <FileIcon />}
              <Typography>{childDirectory.name}</Typography>
            </ListItem>
          ))}
        </List>
        <ModalDrawerFooter>
          <Button onClick={onChoose} variant='contained'>
            Choose
          </Button>

          <Button disabled={isLoading} onClick={onClose} variant='text'>
            Cancel
          </Button>
        </ModalDrawerFooter>
      </ModalDrawer>
      <Box onClick={onChildClick} sx={{ ...sx, opacity: isLoading ? 0.5 : 1, userSelect: isLoading ? 'none' : 'all' }}>
        {children}
      </Box>
    </>
  );
}
