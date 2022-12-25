/* eslint-disable react/require-default-props */
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerItem from './DrawerItem';

const Drawer = ({
  width,
  open,
  children,
}: {
  width: number;
  open: boolean;
  children: React.ReactNode;
}) => {
  return (
    <MuiDrawer
      className="no-print"
      variant="permanent"
      open={open}
      sx={{
        width,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
      }}
    >
      <DrawerItem icon={<MenuIcon />} />

      <Divider />
      <List sx={{ py: 0 }}>{children}</List>
    </MuiDrawer>
  );
};

export default Drawer;
