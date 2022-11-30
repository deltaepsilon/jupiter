import { Image } from 'ui/components';
import { MediaItem } from 'data/media-items';
import { NOOP } from 'ui/utils';
import { SxProps } from '@mui/material';
import { decorateImageBaseUrl } from 'data/media-items';

interface Props {
  crop?: true;
  description?: true;
  height: number;
  mediaItem: MediaItem;
  onError?: () => void;
  width: number;
  sx?: SxProps;
}

export function MediaItemImage({ description, crop, height, mediaItem, onError = NOOP, sx = {}, width }: Props) {
  return (
    <Image
      alt={mediaItem.filename}
      height={height}
      onError={onError}
      src={decorateImageBaseUrl(mediaItem.baseUrl, { height, crop, description })}
      sx={{ ...sx, objectFit: 'cover' }}
      width={width}
    />
  );
}
