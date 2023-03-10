import { AspectRatio, AspectRatioProps } from 'ui/components/aspect-ratio';

import { Box } from '@mui/material';
import { BoxProps } from '@mui/system';

interface Props extends React.ComponentPropsWithoutRef<'video'> {
  ratio?: AspectRatioProps['ratio'];
  sx?: AspectRatioProps['sx'];
}

export function Video({ ratio, sx = {}, ...videoProps }: Props) {
  return ratio ? (
    <Box sx={sx}>
      <AspectRatio ratio={ratio}>
        <video {...videoProps} />
      </AspectRatio>
    </Box>
  ) : (
    <Box sx={{ video: sx } as BoxProps['sx']}>
      <video {...videoProps} />
    </Box>
  );
}
