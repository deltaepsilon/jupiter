import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material';
import { ModalDrawer, ModalDrawerFooter } from 'ui/components';
import { useCallback, useEffect, useState } from 'react';

import { Image } from 'ui/components';
import { stopPropagation, wait } from 'ui/utils';
import { useGooglePhotos } from 'web/hooks';
import { useLibraries } from 'web/contexts/libraries-context';
import { useModalState } from 'ui/hooks';

interface Props {
  children: React.ReactNode;
}

export function LibraryPickerTrigger({ children }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { accessToken, refreshToken, firstPage, changeLibrary, clearLibrary, selectLibrary } = useGooglePhotos();
  const { isOpen, onOpen, onClose } = useModalState({ autoOpenHash: 'library-picker' });
  const { addLibrary, getLibraries } = useLibraries();
  
  const onChildClick = useCallback(async () => {
    setIsLoading(true);
    onOpen();

    await selectLibrary();

    setIsLoading(false);
  }, [onOpen, selectLibrary]);
  const onSave = useCallback(async () => {
    if (accessToken && refreshToken) {
      setIsLoading(true);
      await addLibrary({ accessToken, refreshToken });

      await getLibraries();

      clearLibrary();
      onClose();
    }
  }, [accessToken, addLibrary, clearLibrary, getLibraries, onClose, refreshToken]);

  useEffect(() => {
    !isLoading && isOpen && selectLibrary?.();
  }, [isLoading, isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    !isOpen && setIsLoading(false);
  }, [setIsLoading, isOpen]);

  return (
    <>
      <ModalDrawer
        aria-describedby='pick a google photos library'
        aria-labelledby='pick a google photos library'
        isOpen={isOpen && !isLoading}
        onClose={onClose}
        title='Pick a library'
      >
        <Box onClick={stopPropagation} sx={{ padding: [1, 2] }}>
          <Box>
            {firstPage && (
              <Box sx={{ gridColumn: '1/-1', paddingTop: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ flex: 1 }} variant='h6'>
                    Selected library sample
                  </Typography>
                  <Button
                    onClick={changeLibrary}
                    startIcon={
                      <Image alt='google photos icon' height={12} src='/icons/google-photos-icon.png' width={12} />
                    }
                    sx={{ paddingX: [1, 2] }}
                    variant='outlined'
                  >
                    Change library
                  </Button>
                </Box>
                {firstPage.length ? (
                  <ImageList cols={3} rowHeight={164} sx={{ width: '100%', height: 500 }}>
                    {firstPage.map((mediaItem) => (
                      <ImageListItem key={mediaItem.baseUrl} sx={{ position: 'relative' }}>
                        <Image
                          alt={mediaItem.description ?? 'preview image'}
                          fill
                          sizes='230px'
                          src={mediaItem.baseUrl}
                          sx={{ objectFit: 'cover' }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                ) : (
                  <Typography>No images found in library</Typography>
                )}
              </Box>
            )}
          </Box>
          <ModalDrawerFooter>
            <Button disabled={!accessToken || isLoading} onClick={onSave} variant='contained'>
              Save
            </Button>

            <Button disabled={isLoading} onClick={onClose} variant='text'>
              Cancel
            </Button>
          </ModalDrawerFooter>
        </Box>
      </ModalDrawer>
      <Box onClick={onChildClick} sx={{ opacity: isLoading ? 0.5 : 1, userSelect: isLoading ? 'none' : 'all' }}>
        {children}
      </Box>
    </>
  );
}
