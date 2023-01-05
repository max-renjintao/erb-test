/* eslint-disable react-hooks/exhaustive-deps */
import { Close, Delete, East, Print, Save, West } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import AlertDialog from 'renderer/layouts/AlertDialog';

type B = () => void;
type P = {
  imm: ImmWork;
  status: number;
  remove: B;
  update: B;
  onClose: () => void;
  isEdited: boolean;
};
const FormAdmin = ({
  imm: im,
  update,
  isEdited,
  onClose,
  status,
  remove,
}: P) => {
  const baseUsr = useMemo(() => im[0].status, []);
  const [delDialog, setDelDialog] = useState(false);
  const [work, imWork] = im;
  return (
    <Stack direction="row" justifyContent="end" spacing={1}>
      <Button
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
        size="small"
        startIcon={<East />}
        disabled={work.status === baseUsr + 1}
        onClick={() =>
          imWork((w) => {
            w.status += 1;
          })
        }
      >
        forward
      </Button>
      <Box flexGrow={1} />
      <Button
        size="small"
        color="error"
        startIcon={<Delete />}
        disabled={status < 5}
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
