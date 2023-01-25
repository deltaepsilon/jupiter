import { MediaItemImage, MediaItemImageProps } from './media-item-image';
import { SxProps, Theme } from '@mui/material';

import { Box } from '@mui/material';
import { HiddenScroll } from './hidden-scroll';
import { Link } from 'ui/components';
import { MediaItems } from 'data/media-items';

interface Props {
  mediaItems: MediaItems;
  mediaItemProps: Omit<MediaItemImageProps, 'mediaItem'>;
  sx: SxProps;
}

export function MediaItemCarousel({ mediaItems, mediaItemProps, sx = {} }: Props) {
  return (
    <HiddenScroll sx={sx}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gridGap: 4,
          maxWidth: '100%',
        }}
      >
        {mediaItems.map((mediaItem) => (
          <Link href={mediaItem.productUrl} key={mediaItem.id} target='_blank'>
            <MediaItemImage mediaItem={mediaItem} sx={{ display: 'flex', ...mediaItemProps.sx }} {...mediaItemProps} />
          </Link>
        ))}
      </Box>
    </HiddenScroll>
  );
}
