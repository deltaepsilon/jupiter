import { Box } from '@mui/material';
import Head from 'next/head';

interface Props {
  children: React.ReactNode;
}

export function MdxLayout({ children }: Props) {
  return (
    <Box
      sx={{
        maxWidth: '50rem',
        img: { marginY: 1, borderRadius: 'var(--border-radius)', maxWidth: '100%' },
        blockquote: {
          borderLeft: '4px solid var(--color-white)',
          paddingX: 2,
          paddingY: 1,
        },
        pre: {
          backgroundColor: 'var(--color-light-gray)',
          padding: 1,
          code: {
            paddingX: 0,
          },
        },
        code: {
          backgroundColor: 'var(--color-light-gray)',
          paddingX: 1,
        },
        'h1, h2, h3, h4, h5, h6': { position: 'relative', marginTop: 5 },
        '.icon-link': {
          position: 'absolute',
          top: 'calc(50% - 12px)',
          right: '-2rem',
          display: 'block',
          width: 24,
          height: 24,
          transform: 'scale(90%)',
          backgroundImage: 'url(/icons/material-design/link_black_24dp.svg)',
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

export function MetaDescription({ content }: { content: string }) {
  return (
    <Head>
      <meta content={content} name='description' />
    </Head>
  );
}
