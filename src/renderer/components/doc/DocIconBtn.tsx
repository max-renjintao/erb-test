/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { CropFree } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';

export type IconBtnProps = {
  MuiIcon?: (props: any) => JSX.Element;
} & IconButtonProps;
const IconBtn = ({ MuiIcon = CropFree, ...ps }: IconBtnProps) => (
  <IconButton className="no-print" size="small" color="warning" {...ps}>
    <MuiIcon fontSize="small" />
  </IconButton>
);
export default IconBtn;
