/* eslint-disable react/require-default-props */
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';

type P = {
  icon: React.ReactNode;
  text?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};
const DrawerItem = ({ icon, text, active, disabled, onClick }: P) => (
  <ListItem disablePadding sx={{ display: 'block' }}>
    <ListItemButton
      disabled={disabled}
      onClick={onClick}
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
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
);

export default DrawerItem;
