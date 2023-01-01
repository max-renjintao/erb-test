/* eslint-disable react/jsx-props-no-spreading */
import { Box } from '@mui/material';
import { ReactNode } from 'react';
import DrawerItem from 'renderer/layouts/DrawerItem';
import Drawer from 'renderer/layouts/Drawer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from 'renderer/store/Store';

type P = {
  links: { icon: ReactNode; path: string; authority: number }[];
  children: ReactNode;
};
const Layout = ({ links, children }: P) => {
  console.log('<Layout>');
  const { app, imApp } = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        width={40}
        open={false}
        onClickButton={() => {
          navigate('/');
          imApp((a) => {
            a.usr = 0;
          });
        }}
      >
        {links.map(({ path, authority, ...rest }) => (
          <DrawerItem
            key={path}
            active={pathname === path}
            disabled={app.usr < authority}
            onClick={() => navigate(path)}
            {...rest}
          />
        ))}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
