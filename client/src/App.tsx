import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom';

import { AuthProvider, useAuth } from './providers/auth';
import theme from './theme';
import { Login } from './apps/Authentication';
import Nav from './components/Nav/Nav';
import Dashboard from './components/Dashboard/Dashboard';
import Image from './Image';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <Image imageUrl={
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fimages%2Fanimals%2Fdeer&psig=AOvVaw24YOTwC1NvX6al9B380lYd&ust=1666238923287000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPC3xuq16_oCFQAAAAAdAAAAABAT"
      }/>
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
