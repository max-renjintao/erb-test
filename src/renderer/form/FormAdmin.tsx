/* eslint-disable react-hooks/exhaustive-deps */
import { Close, Delete, East, Print, Save, West } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { STATUS } from 'constants/const-work';
import { on } from 'events';
import { useEffect, useMemo, useState } from 'react';
import Btn from 'renderer/components/ui/Btn';
import BtnWithAlert from 'renderer/components/ui/BtnWithAlert';

type B = () => void;
type P = {
  imm: ImmWork;
  usr: number;
  remove: B;
  update: B;
  onClose: () => void;
  isEdited: boolean;
};
const FormAdmin = ({ imm, update, isEdited, onClose, usr, remove }: P) => {
  const baseStatus = useMemo(() => imm[0].status, []);
  const [work, imWork] = imm;
  // const [turnedStatus, setTurnedStatus] = useState(false);
  useEffect(() => {
    if (work.status !== baseStatus) {
      update();
    }
  }, [work.status]);
  useEffect(() => {
    if (work.status !== baseStatus && !isEdited) {
      onClose();
    }
  }, [isEdited]);
  // useEffect(() => {
  //   update();
  //   onClose();
  // }, [turnedStatus]);
  const print = () => window.electron.ipcRenderer.sendMessage('print', []);
  return (
    <Stack direction="row" justifyContent="end" spacing={1}>
      <BtnWithAlert
        startIcon={<West />}
        text="Return"
        title={`Return the work to last status: "${STATUS[work.status - 1]}"`}
        btnProps={[
          {
            text: 'Return',
            startIcon: <West />,
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
            startIcon: <East />,
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
        disabled={usr < 5}
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

      <Btn
        text="update"
        startIcon={<Save />}
        color="success"
        disabled={!isEdited}
        onClick={update}
      />
      <Btn text="print" startIcon={<Print />} color="warning" onClick={print} />
      <Btn text="close" startIcon={<Close />} onClick={onClose} />
    </Stack>
  );
};

export default FormAdmin;
