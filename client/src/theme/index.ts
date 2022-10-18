import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#00291f', contrastText: '#fff' },
    secondary: { main: '#2d772d', contrastText: '#fff' },
  },
});

export default theme;
