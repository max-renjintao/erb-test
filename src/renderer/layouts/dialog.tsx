/* eslint-disable react/jsx-props-no-spreading */
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function ScrollDialog({
  children,
  onClose,
  ...rest
}: DialogProps) {
  return (
    <Dialog
      scroll="body"
      // aria-labelledby="scroll-dialog-title"
      // aria-describedby="scroll-dialog-description"
      maxWidth="lg"
      PaperProps={{ sx: { border: 0, boxShadow: 0 } }}
      // slotProps
      {...rest}
    >
      {/* <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle> */}
      {/* <DialogContent dividers> */}
      {/* <DialogContentText
          // id="scroll-dialog-description"
          // ref={descriptionElementRef}
          tabIndex={-1}
        > */}
      {children}
      {/* </DialogContentText> */}
      {/* </DialogContent> */}
    </Dialog>
  );
}
