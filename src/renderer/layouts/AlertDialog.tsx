/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export type AlertDialogProps = DialogProps & {
  title?: string;
  content?: string;
};
export default function AlertDialog({
  title,
  content,
  children,
  ...rest
}: AlertDialogProps) {
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
