/* eslint-disable react/jsx-props-no-spreading */
import { Box } from '@mui/material';
import IconBtn, { IconBtnProps } from './DocIconBtn';

type P = IconBtnProps;
const IconBtnFly = ({ sx, ...ps }: P) => {
  return (
    <Box
      component="span"
      className="no-print"
      sx={{ position: 'absolute', ...sx }}
    >
      <IconBtn {...ps} />
    </Box>
  );
};

export default IconBtnFly;
