/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */

import { Input, InputProps } from '@mui/material';

type P = {
  label?: string;
  pl?: string;
  onEdit: (v: string) => void;
} & InputProps;

const InNum = ({ label, pl, onEdit, ...props }: P) => (
  <Input
    type="number"
    startAdornment={
      label && <small style={{ minWidth: pl || '70px' }}>{label}</small>
    }
    size="small"
    inputProps={{ style: { textAlign: 'right' } }}
    onChange={(e) => onEdit(e.target.value)}
    {...props}
  />
);
export default InNum;
