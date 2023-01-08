/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */

import { Input, InputProps } from '@mui/material';

export type InTextProps = { label?: string; pl?: string } & InputProps;

const InText = ({ label, pl, ...props }: InTextProps) => (
  <Input
    startAdornment={
      label && <small style={{ minWidth: pl || '70px' }}>{label}</small>
    }
    size="small"
    {...props}
  />
);
export default InText;
