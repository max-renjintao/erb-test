/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@mui/material';
import React from 'react';
import Dlg, { DlgProps } from 'renderer/components/ui/Dlg';

type P = {
  onSaveQuit: () => void;
  onQuit: () => void;
  onClose: () => void;
} & DlgProps;
const DlgQuit = ({ onSaveQuit, onQuit, onClose, ...rest }: P) => {
  return (
    <Dlg
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
    </Dlg>
  );
};

export default DlgQuit;
