import { createTheme, responsiveFontSizes } from '@mui/material';

const FONT_BOLD = {
  fontFamily: 'gelica, sans-serif',
  fontWeight: 600,
};

const FONT_SEMIBOLD = {
  fontFamily: 'gelica, sans-serif',
  fontWeight: 600,
};

const FONT_BLACK = {
  fontFamily: 'gelica, sans-serif',
  fontWeight: 600,
};

export const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
            fontWeight: 500,
            textTransform: 'inherit',
          },
          contained: {
            '&:hover': {
              backgroundColor: 'var(--color-orange)',
            },
          },
          outlined: {
            // borderColor: 'white',
            // borderWidth: 2,
            // // background: 'white',
            // '&:hover': {
            //   background: 'white',
            // },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            color: 'var(--color-gentian-blue-metallic)',
            padding: '1rem',
          },
        },
        variants: [
          {
            props: { elevation: 1 },
            style: {
              border: '1px solid var(--color-gentian-blue-metallic)',
              boxShadow: '4px 4px 0px 2px var(--color-gentian-blue-metallic)',
              marginRight: 6,
            },
          },
          {
            props: { elevation: 2 },
            style: {
              border: '1px solid var(--color-pastel-blue)',
              boxShadow: '4px 4px 0px 2px var(--color-pastel-blue)',
              marginRight: 6,
            },
          },
        ],
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            strong: {
              color: 'var(--color-orange)',
            },
          },
        },
      },
    },
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#09203f',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#cbe800',
      },
    },
    typography: {
      fontFamily: 'aglet-mono, sans-serif',
      fontWeightRegular: 400,

      h1: FONT_BLACK,
      h2: FONT_BLACK,
      h3: FONT_BOLD,
      h4: FONT_BOLD,
      h5: FONT_SEMIBOLD,
      h6: FONT_SEMIBOLD,
    },
  })
);
