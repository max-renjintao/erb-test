/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactNode } from 'react';

export type DlgProps = DialogProps & {
  title?: string;
  content?: ReactNode;
};
export default function Dlg({ title, content, children, ...rest }: DlgProps) {
  return (
    <Dialog {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>{children}</DialogActions>
    </Dialog>
  );
}
