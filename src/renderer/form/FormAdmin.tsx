/* eslint-disable react-hooks/exhaustive-deps */
import { Close, Delete, East, Print, Save, West } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { STATUS } from 'constants/const-work';
import { on } from 'events';
import { useEffect, useMemo, useState } from 'react';
import BtnWithAlert from 'renderer/components/ui/BtnWithAlert';

type B = () => void;
type P = {
  imm: ImmWork;
  status: number;
  remove: B;
  update: B;
  onClose: () => void;
  isEdited: boolean;
};
const FormAdmin = ({ imm, update, isEdited, onClose, status, remove }: P) => {
  const baseUsr = useMemo(() => imm[0].status, []);
  const [work, imWork] = imm;
  useEffect(() => {
    if (work.status !== status) {
      update();
    }
  }, [work.status]);
  useEffect(() => {
    if (work.status !== status && !isEdited) {
      onClose();
    }
  }, [isEdited]);
  return (
    <Stack direction="row" justifyContent="end" spacing={1}>
      <BtnWithAlert
        startIcon={<West />}
        text="Return"
        title={`Return the work to last status: "${STATUS[work.status - 1]}"`}
        btnProps={[
          {
            children: 'Return',
            onClick: () =>
              imWork((w) => {
                w.status -= 1;
              }),
          },
        ]}
      />
      <BtnWithAlert
        startIcon={<East />}
        text="Forward"
        title={`Forward the work to next status: "${STATUS[work.status + 1]}"`}
        btnProps={[
          {
            children: 'Forward',
            onClick: () =>
              imWork((w) => {
                w.status += 1;
              }),
          },
        ]}
      />

      <Box flexGrow={1} />
      <BtnWithAlert
        color="error"
        text="Delete"
        startIcon={<Delete />}
        disabled={status < 5}
        title="Delete a work?"
        btnProps={[
          {
            color: 'error',
            children: 'Delete',
            onClick: () => {
              remove();
              onClose();
            },
          },
        ]}
      />

      <Button
        size="small"
        startIcon={<Save />}
        color="success"
        disabled={!isEdited}
        onClick={update}
      >
        update
      </Button>
      <Button
        size="small"
        startIcon={<Print />}
        color="warning"
        onClick={() => window.electron.ipcRenderer.sendMessage('print', [])}
      >
        print
      </Button>
      <Button size="small" startIcon={<Close />} onClick={onClose}>
        close
      </Button>
    </Stack>
  );
};

export default FormAdmin;
