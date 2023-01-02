/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { CropFree } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';
import React, { ReactNode } from 'react';

type P = { MuiIcon?: (props: any) => JSX.Element } & IconButtonProps;
const IconButtonSmall = ({ MuiIcon = CropFree, ...ps }: P) => (
  <IconButton size="small" {...ps}>
    <MuiIcon fontSize="small" />
  </IconButton>
);
export default IconButtonSmall;
