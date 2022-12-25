import { Box } from '@mui/material';
import React from 'react';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import Drawer, { DrawerItem } from './drawer';
import ScrollDialog from './dialog';

const Layout = ({ children }: { children: React.ReactNode }) => {
  console.log('<Layout>');

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer width={40} open={false}>
        <DrawerItem icon={<NewspaperIcon />} />
        <DrawerItem icon={<CarCrashIcon />} active />
        <DrawerItem icon={<PeopleIcon />} />
        <DrawerItem icon={<WarehouseIcon />} />
        <DrawerItem icon={<PaidIcon />} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
