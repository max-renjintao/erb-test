/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@mui/material';
import React from 'react';
import AlertDialog, { AlertDialogProps } from 'renderer/layouts/AlertDialog';

type P = {
  onSaveQuit: () => void;
  onQuit: () => void;
  onClose: () => void;
} & AlertDialogProps;
const QuitAlert = ({ onSaveQuit, onQuit, onClose, ...rest }: P) => {
  return (
    <AlertDialog
      title="Quit Work Edit"
      content="Quit Work Edit without Save, will lose your edition. Please Make Sure..."
      {...rest}
    >
      <Button color="success" onClick={onSaveQuit}>
        Save and quit
      </Button>
      <Button color="warning" onClick={onQuit}>
        Quit Without Save
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </AlertDialog>
  );
};

export default QuitAlert;
