import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom';

import { AuthProvider, useAuth } from './providers/auth';
import theme from './theme';
import { Login } from './apps/Authentication';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path='/' element={<Dashboard />} />
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
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default App;
