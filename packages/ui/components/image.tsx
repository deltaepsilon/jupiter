import { AspectRatio, AspectRatioProps } from 'ui/components/aspect-ratio';
import NextImage, { ImageProps } from 'next/image';

import { Box } from '@mui/material';

interface Props extends ImageProps {
  ratio?: AspectRatioProps['ratio'];
  sx?: AspectRatioProps['sx'];
}

export function Image({ ratio, sx = {}, ...imageProps }: Props) {
  return ratio ? (
    <Box sx={sx}>
      <AspectRatio ratio={ratio}>
        <NextImage {...imageProps} fill />
      </AspectRatio>
    </Box>
  ) : (
    <NextImage {...imageProps} />
  );
}
