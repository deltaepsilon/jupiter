import { Box, SxProps } from '@mui/material';

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
}

export function Container({ children, sx = {} }: Props) {
  return (
    <Box
      sx={{
        alignSelf: 'center',
        paddingY: 4,
        width: '100%',
        maxWidth: '80rem',
        minHeight: '50vh',
        backgroundColor: 'gold',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
