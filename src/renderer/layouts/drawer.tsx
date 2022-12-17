/* eslint-disable react/require-default-props */
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';

export const DrawerItem = ({
  icon,
  text,
  active,
}: {
  icon: React.ReactNode;
  text?: string;
  active?: boolean;
}) => (
  <ListItem disablePadding sx={{ display: 'block' }}>
    <ListItemButton
      // disabled={active}
      sx={{
        minHeight: 48,
        // justifyContent: open ? 'initial' : 'center',
        px: 1,
        ...(active ? { backgroundColor: '#ccc' } : undefined),
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          // ...(active ? { opacity: 1 } : undefined),
          // mr: open ? 3 : 'auto',
          // justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>
      {/* <ListItemText primary={text} /> */}
    </ListItemButton>
  </ListItem>
);
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
