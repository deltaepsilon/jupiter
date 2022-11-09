import { Box, Button, TextField, Typography } from '@mui/material';
import { MediaItems, mediaItemsResponseSchema } from 'data/media-items';
import { useCallback, useState } from 'react';

import FolderIcon from '@mui/icons-material/Folder';
import { Image } from 'ui/components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { WEB } from 'data/web';
import { addParams } from 'ui/utils';
import { useAuth } from 'ui/contexts';
import { useRouter } from 'next/router';

export function CreateSyncJobForm() {
  const { firstPage, onLibraryPickerClick } = useGooglePhotos();

  return (
    <>
      <Typography sx={{ paddingBottom: 4 }} variant='h6'>
        Steps
      </Typography>
      <Box sx={{ display: 'grid', gridGap: 16, gridTemplateColumns: ['1fr', '1fr 1fr'] }}>
        <Typography variant='subtitle2'>1. Authorize Google Account</Typography>
        <Button
          disabled={!!firstPage}
          onClick={onLibraryPickerClick}
          startIcon={<Image alt='google photos icon' height={12} src='/icons/google-photos-icon.png' width={12} />}
          variant='outlined'
        >
          Authorize
        </Button>

        {firstPage && (
          <ImageList cols={3} rowHeight={164} sx={{ width: '100%', height: 350, gridColumn: '1/-1' }}>
            {firstPage.map((mediaItem) => (
              <ImageListItem key={mediaItem.baseUrl}>
                <Image
                  alt={mediaItem.description ?? 'preview image'}
                  fill
                  src={mediaItem.baseUrl}
                  sx={{ objectFit: 'cover' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}

        <Typography variant='subtitle2'>2. Pick a sync destination</Typography>

        <Button startIcon={<FolderIcon />} variant='outlined'>
          Pick a destination
        </Button>
      </Box>
    </>
  );
}

function useGooglePhotos() {
  const [firstPage, setFirstPage] = useState<MediaItems>();
  const router = useRouter();

  const onLibraryPickerClick = useCallback(async () => {
    const response = await fetch(WEB.API.MEDIA_ITEMS);

    if (response.status === 401) {
      const response = await fetch(
        addParams(`${location.origin}${WEB.API.OAUTH2}`, { redirect: window.location.href })
      );
      const { authUrl } = await response.json();

      router.replace(authUrl);
    } else {
      const data = await response.json();
      const { mediaItems } = mediaItemsResponseSchema.parse(data);

      setFirstPage(mediaItems);
    }
  }, [router]);

  return { firstPage, onLibraryPickerClick };
}
