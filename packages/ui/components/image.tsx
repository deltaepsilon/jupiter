import { AspectRatio, AspectRatioProps } from 'ui/components/aspect-ratio';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

import { Box } from '@mui/material';
import { BoxProps } from '@mui/system';

export interface ImageProps extends NextImageProps {
  ratio?: AspectRatioProps['ratio'];
  sx?: AspectRatioProps['sx'];
}

export function Image({ ratio, sx = {}, ...imageProps }: ImageProps) {
  return ratio ? (
    <Box sx={sx}>
      <AspectRatio ratio={ratio}>
        <NextImage {...imageProps} fill />
      </AspectRatio>
    </Box>
  ) : (
    <Box sx={{ img: sx } as BoxProps['sx']}>
      <NextImage {...imageProps} />
    </Box>
  );
}
