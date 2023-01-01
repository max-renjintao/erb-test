/* eslint-disable react/require-default-props */
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import DrawerItem from './DrawerItem';

const Drawer = ({
  width,
  open,
  children,
  onClickButton,
}: {
  onClickButton: () => void;
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
      <DrawerItem icon={<LockPersonIcon />} onClick={onClickButton} />

      <Divider />
      <List sx={{ py: 0 }}>{children}</List>
    </MuiDrawer>
  );
};

export default Drawer;
