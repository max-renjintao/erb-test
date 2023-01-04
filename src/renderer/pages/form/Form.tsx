/* eslint-disable react-hooks/exhaustive-deps */
import { Close, Delete, East, Print, Save, West } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useMemo, useState } from 'react';
import FormWrap from 'renderer/components/Form/FormWrap';
import InImDate from 'renderer/components/inputs/InImDate';
import InImNum from 'renderer/components/inputs/InImNum';
import InImText from 'renderer/components/inputs/InImText';
import AlertDialog from 'renderer/layouts/AlertDialog';
import { ImmerHook } from 'use-immer';

type B = () => void;
type P = {
  im: ImmerHook<Work>;
  status: number;
  remove: B;
  update: B;
  onClose: () => void;
  isEdited: boolean;
};
const Form = ({ im, update, isEdited, onClose, status, remove }: P) => {
  const baseUsr = useMemo(() => im[0].status, []);
  const [delDialog, setDelDialog] = useState(false);
  const [work, imWork] = im;
  return (
    <FormWrap>
      <Stack direction="row" justifyContent="end" spacing={1}>
        <Button
          color="warning"
          size="small"
          startIcon={<West />}
          disabled={work.status === baseUsr - 1}
          onClick={() =>
            imWork((w) => {
              w.status -= 1;
            })
          }
        >
          return
        </Button>
        <Button
          color="success"
          size="small"
          startIcon={<East />}
          disabled={work.status === baseUsr + 1}
          onClick={() =>
            imWork((w) => {
              w.status += 1;
            })
          }
        >
          done
        </Button>
        <Box flexGrow={1} />
        <Button
          size="small"
          color="error"
          startIcon={<Delete />}
          disabled={status === 5}
          onClick={() => setDelDialog(true)}
        >
          Delete
        </Button>
        <AlertDialog
          title="Delete a work?"
          open={delDialog}
          onClose={() => setDelDialog(false)}
        >
          <Button
            color="error"
            onClick={() => {
              remove();
              setDelDialog(false);
              onClose();
            }}
          >
            Delete right now
          </Button>
          <Button onClick={() => setDelDialog(false)}>Cancel</Button>
        </AlertDialog>
        <Button
          size="small"
          startIcon={<Save />}
          disabled={!isEdited}
          onClick={update}
        >
          update
        </Button>
        <Button
          size="small"
          startIcon={<Print />}
          onClick={() => window.electron.ipcRenderer.sendMessage('print', [])}
        >
          print
        </Button>
        <Button size="small" startIcon={<Close />} onClick={onClose}>
          close
        </Button>
      </Stack>
      <Stack direction="row" spacing={1}>
        <InImText immer={[im, 'sn']} pl="30px" sx={{ width: 100 }} />
        <InImDate immer={[im, 'date_s']} pl="60px" sx={{ width: 180 }} />
        <InImDate immer={[im, 'date_e']} pl="60px" sx={{ width: 180 }} />
        <InImNum immer={[im, 'team']} pl="40px" sx={{ width: 50 }} />
        <InImNum immer={[im, 'status']} pl="50px" sx={{ width: 60 }} />
      </Stack>
      <Stack direction="row">
        <InImText immer={[im, 'note']} multiline pl="50px" />
      </Stack>
    </FormWrap>
  );
};

export default Form;
