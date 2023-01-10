/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export type BtnProps = { text?: ReactNode } & ButtonProps;
const Btn = ({ text, children, ...ps }: BtnProps) => {
  return (
    <Button size="small" {...ps}>
      {text}
      {children}
    </Button>
  );
};

export default Btn;
