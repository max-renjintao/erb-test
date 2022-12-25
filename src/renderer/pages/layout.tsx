/* eslint-disable react/jsx-props-no-spreading */
import { Box } from '@mui/material';
import { ReactNode } from 'react';
import DrawerItem from 'renderer/layouts/DrawerItem';
import Drawer from 'renderer/layouts/Drawer';
import { useLocation, useNavigate } from 'react-router-dom';

type P = {
  links: { icon: ReactNode; path: string; text: string }[];
  children: ReactNode;
};
const Layout = ({ links, children }: P) => {
  console.log('<Layout>');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer width={40} open={false}>
        {links.map(({ path, ...rest }) => (
          <DrawerItem
            key={path}
            active={pathname === path}
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
