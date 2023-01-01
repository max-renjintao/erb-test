/* eslint-disable react-hooks/exhaustive-deps */
import { Delete, Print, Save } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useMemo } from 'react';
import FormWrap from 'renderer/components/Form/Form';
import InImText from 'renderer/components/inputs/InImText';
import { ImmerHook } from 'use-immer';

type B = () => void;
type P = {
  im: ImmerHook<Work>;
  // remove: B;
  update: B;
  onClose: () => void;
  isEdited: boolean;
};
const FormNote = ({ im, update, isEdited, onClose }: P) => {
  const baseUsr = useMemo(() => im[0].status, []);
  const [work, imWork] = im;
  return (
    <FormWrap>
      <Stack direction="row" justifyContent="end" spacing={1}>
        <Button
          color="warning"
          size="small"
          startIcon={<Save />}
          disabled={work.status === baseUsr - 1}
          onClick={() =>
            imWork((w) => {
              w.status -= 1;
            })
          }
        >
          return back
        </Button>
        <Button
          color="success"
          size="small"
          startIcon={<Save />}
          disabled={work.status === baseUsr + 1}
          onClick={() =>
            imWork((w) => {
              w.status += 1;
            })
          }
        >
          done forward
        </Button>
        <Box flexGrow={1} />
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
        <Button size="small" startIcon={<Print />} onClick={onClose}>
          close
        </Button>
      </Stack>
      <InImText immer={[im, 'note']} multiline pl="50px" />
    </FormWrap>
  );
};

export default FormNote;
