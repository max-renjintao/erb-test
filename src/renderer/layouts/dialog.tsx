/* eslint-disable react/jsx-props-no-spreading */
import Dialog, { DialogProps } from '@mui/material/Dialog';

export default function ScrollDialog(props: DialogProps) {
  return (
    <Dialog
      scroll="body"
      // aria-labelledby="scroll-dialog-title"
      // aria-describedby="scroll-dialog-description"
      maxWidth="lg"
      PaperProps={{ sx: { border: 0, boxShadow: 0 } }}
      // slotProps
      {...props}
    >
      {/* <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle> */}
      {/* <DialogContent dividers> */}
      {/* <DialogContentText
          // id="scroll-dialog-description"
          // ref={descriptionElementRef}
          tabIndex={-1}
        > */}
      {/* {children} */}
      {/* </DialogContentText> */}
      {/* </DialogContent> */}
    </Dialog>
  );
}
