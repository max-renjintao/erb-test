/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Box, IconButton, Popover } from '@mui/material';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { BoxProps } from '@mui/system';
import IconBtn from './IconBtn';

export default function MenuEditJob({ children, sx, ...ps }: BoxProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <Box component="span" sx={{ position: 'absolute', ...sx }} {...ps}>
      <IconBtn onClick={(e) => setAnchorEl(e.currentTarget)} />
      <Popover
        elevation={1}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        PaperProps={{ sx: { p: 0, bgcolor: '#eee' } }}
        // sx={{ minHeight: 0 }}
        onClick={() => setAnchorEl(null)}
      >
        {children}
      </Popover>
    </Box>
  );
}
