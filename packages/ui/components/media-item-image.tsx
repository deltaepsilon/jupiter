import { Image } from 'ui/components';
import { MediaItem } from 'data/media-items';
import { SxProps } from '@mui/material';
import { decorateImageBaseUrl } from 'data/media-items';

interface Props {
  crop?: true;
  description?: true;
  height: number;
  mediaItem: MediaItem;
  width: number;
  sx?: SxProps;
}

export function MediaItemImage({ description, crop, height, mediaItem, sx = {}, width }: Props) {
  return (
    <Image
      alt={mediaItem.filename}
      height={height}
      src={decorateImageBaseUrl(mediaItem.baseUrl, { height, crop, description })}
      sx={{ ...sx, objectFit: 'cover' }}
      width={width}
    />
  );
}
