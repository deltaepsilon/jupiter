import { Box, SxProps } from '@mui/material';

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
}

export function Container({ children, sx = {} }: Props) {
  return (
    <Box
      data-container
      sx={{
        alignSelf: 'center',
        paddingY: 4,
        width: '100%',
        maxWidth: '80rem',
        minHeight: '50vh',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
