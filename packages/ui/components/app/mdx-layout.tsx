import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export function MdxLayout({ children }: Props) {
  return (
    <Box
      sx={{
        maxWidth: '50rem',
        img: { marginY: 1, borderRadius: 'var(--border-radius)' },
        blockquote: {
          borderLeft: '4px solid var(--color-white)',
          paddingX: 2,
          paddingY: 1
        },
      }}
    >
      {children}
    </Box>
  );
}

export function TwoColumn({ children }: Props) {
  return <Box sx={{ display: 'grid', gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'], gridGap: 16 }}>{children}</Box>;
}
