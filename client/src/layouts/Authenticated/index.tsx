import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Construction from '@mui/icons-material/Construction';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import ExtensionIcon from '@mui/icons-material/Extension';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';

import CssBaseline from '@mui/material/CssBaseline';
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from '@mui/material';

import Nav from '../../components/Nav';

const drawerWidth = 300;

const drawerData = [
  {
    name: 'HPT Details',
    icon: <Construction />,
    to: '/',
    isActiveLink: true,
    subMenu: [],
  },
  {
    name: 'Components',
    icon: <ExtensionIcon />,
    isActiveLink: false,
    to: '/components/battery',
    subMenu: [
      {
        name: 'Battery',
        icon: <ElectricMeterIcon />,
        to: '/components/battery',
        isActiveLink: true,
      },
      {
        name: 'Motor',
        icon: <SettingsInputSvideoIcon />,
        to: '/components/motor',
        isActiveLink: true,
      },
      {
        name: 'Transport',
        icon: <LocalShippingIcon />,
        to: '/components/transport',
        isActiveLink: true,
      },
    ],
  },
];

const getItem = (key, icon, name, to, isActiveLink, isCurrentPath) => (
  <Link
    to={to}
    style={{ textDecoration: 'none', color: 'rgb(250, 249, 246)' }}
    key={key}
  >
    <ListItem button={isActiveLink ? true : false} disabled={!isCurrentPath}>
      <ListItemIcon sx={{ color: 'rgb(250, 249, 246)' }}>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  </Link>
);

const getList = (path) => (
  <div style={{ width: 300 }}>
    {drawerData.map((item, index) => {
      const isParentActive =
        item.to === path || item.subMenu.find((val) => val.to === path);

      return (
        <>
          {getItem(
            index,
            item.icon,
            item.name,
            item.to,
            item.isActiveLink,
            isParentActive,
          )}
          <div style={{ marginLeft: '24px' }}>
            {item.subMenu.map((item, index) => {
              const isChildActive = path === item.to;
              return getItem(
                index,
                item.icon,
                item.name,
                item.to,
                item.isActiveLink,
                isChildActive,
              );
            })}
          </div>
        </>
      );
    })}
  </div>
);

const Authenticated = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Nav />
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url('https://www.oxygenna.com/wp-content/uploads/2014/08/tools-blog.jpg')",
          filter: 'blur(4px)',
          WebkitFilter: 'blur(4px)',
          height: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh',
          zIndex: 1,
          position: 'fixed',
          left: 0,
          right: 0,
          display: 'block',
        }}
      ></div>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(0, 87, 61, 0.9)',
            color: 'rgb(250, 249, 246)',
          },
        }}
      >
        <Toolbar />
        {getList(location.pathname)}
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1, position: 'relative', zIndex: 12 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Authenticated;
