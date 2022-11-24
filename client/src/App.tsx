import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider, useAuth } from './providers/auth';
import theme from './theme';
import { Login } from './apps/Authentication';
import Authenticated from './layouts/Authenticated';
import Dashboard from './apps/Dashboard/Dashboard';
import Battery from './apps/Battery';
import Motor from './apps/Motor';
import Transport from './apps/Transport';
import Workbench from './apps/Workbench';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route element={<Authenticated />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='/components/battery' element={<Battery />} />
                <Route path='/components/motor' element={<Motor />} />
                <Route path='/components/transport' element={<Transport />} />
                <Route path='/workbench' element={<Workbench />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
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
