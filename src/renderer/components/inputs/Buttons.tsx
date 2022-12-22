/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { IconButton, IconButtonProps } from '@mui/material';

export const ButtonSide = ({
  left,
  right,
  mt,
  children,
  ...props
}: { left?: number; right?: number; mt?: number } & IconButtonProps) => {
  return (
    <span
      className="no-print"
      style={{
        padding: 0,
        position: 'absolute',
        left,
        right,
        marginTop: mt,
      }}
    >
      <IconButton sx={{ width: 22, height: 22 }} {...props}>
        {children}
      </IconButton>
    </span>
  );
};
export const btn2 = {};
