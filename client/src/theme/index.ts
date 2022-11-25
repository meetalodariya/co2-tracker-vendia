import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#00291f', contrastText: '#fff' },
    secondary: { main: '#2d772d', contrastText: '#fff' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          .pac-container {
            z-index: 9999 !important;
          }
        `,
    },
  },
});

export default theme;
