import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2da57c', contrastText: '#fff' },
    secondary: { main: '#FFCC00', contrastText: '#333' },
  },
});

export default theme;
