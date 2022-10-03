import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<> Hello there!!</>}></Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
