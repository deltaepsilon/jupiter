import { BaseUrlDecorators, decorateImageBaseUrl } from 'data/media-items';
import { Image, ImageProps } from 'ui/components';

import { MediaItem } from 'data/media-items';
import { NOOP } from 'ui/utils';
import { SxProps } from '@mui/material';

export interface MediaItemImageProps extends Omit<ImageProps, 'alt' | 'src' | 'width' | 'height'>, BaseUrlDecorators {
  mediaItem: MediaItem;
  onError?: () => void;
  sx?: SxProps;
}

export function MediaItemImage({
  crop,
  height,
  mediaItem,
  onError = NOOP,
  sx = {},
  width,
  ...rest
}: MediaItemImageProps) {
  return (
    <Image
      alt={mediaItem.filename}
      height={height}
      onError={onError}
      src={decorateImageBaseUrl(mediaItem.baseUrl, { height, crop })}
      sx={{ ...sx, objectFit: 'cover' }}
      width={width}
      {...rest}
    />
  );
}
