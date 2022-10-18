import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom';

import { AuthProvider, useAuth } from './providers/auth';
import theme from './theme';
import { Login } from './apps/Authentication';
import Nav from './components/Nav/Nav';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <Nav/>
      <Routes>          
        <Route path='/' element={<Login />}></Route>
        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
      </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.user) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default App;
