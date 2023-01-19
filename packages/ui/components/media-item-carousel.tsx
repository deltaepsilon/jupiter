import { MediaItemImage, MediaItemImageProps } from './media-item-image';

import { Box } from '@mui/material';
import { MediaItems } from 'data/media-items';

interface Props {
  mediaItems: MediaItems;
  mediaItemProps: Omit<MediaItemImageProps, 'mediaItem'>;
}

export function MediaItemCarousel({ mediaItems, mediaItemProps }: Props) {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gridGap: 4, maxWidth: '100%', scrollX: 'auto', overflow: 'hidden' }}
    >
      {mediaItems.map((mediaItem) => (
        <MediaItemImage
          key={mediaItem.id}
          mediaItem={mediaItem}
          sx={{ display: 'flex', ...mediaItemProps.sx }}
          {...mediaItemProps}
        />
      ))}
    </Box>
  );
}
