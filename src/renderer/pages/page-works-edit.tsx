/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { Box, Button, Drawer, Stack } from '@mui/material';
import useApp from 'renderer/store/useApp';
import useWork from 'renderer/store/useWork';
import useWorks from 'renderer/store/useWorks';
import { workInit } from 'constants/const-work';
import { useImmer } from 'use-immer';

import { Add } from '@mui/icons-material';
import FormVehicle from './form/FormVehicle';
import FormNote from './form/FormNote';
import Doc from './doc/Doc';
import QuitAlert from './dialog/QuitAlert';
import DataGridWorks from './data-grid/DataGridWorks';

type P = { status: number };
const PageWorksEdit = ({ status }: P) => {
  const { app } = useApp();
  const { works, append } = useWorks();
  const [id, setId] = useState(-1);
  const [quitId, setQuitId] = useState(-2);
  const { work, imWork, update, isEdited } = useWork(id);
  const [rows, setRows] = useImmer<Work[]>([]);
  useEffect(() => setRows(works), [works]);
  useEffect(() => setId(-1), [status]);

  return (
    <Stack sx={{ width: '100%', height: '100vh' }}>
      <DataGridWorks
        status={status}
        works={rows.filter((w) => w.status === status)}
        id={id}
        onRowClick={(ps) => (isEdited ? setQuitId(+ps.id) : setId(+ps.id))}
      />
      <Stack direction="row">
        {status <= 2 && (
          <Button
            startIcon={<Add fontSize="small" />}
            size="small"
            onClick={() =>
              append({ ...workInit, status, date_s: new Date(Date.now()) })
            }
          >
            Append
          </Button>
        )}
      </Stack>

      <Drawer
        variant="persistent"
        anchor="right"
        open={!!work}
        PaperProps={{ sx: { width: 920 } }}
      >
        {work && (
          <>
            <FormNote
              im={[work, imWork]}
              update={update}
              // remove={remove}
              isEdited={isEdited}
              onClose={() => (isEdited ? setQuitId(-1) : setId(-1))}
            />

            <Doc imm={[work, imWork]} options={app.options} />
          </>
        )}
      </Drawer>

      <QuitAlert
        open={quitId > -2}
        onClose={() => setQuitId(-2)}
        onSaveQuit={() => {
          update();
          setId(quitId);
          setQuitId(-2);
        }}
        onQuit={() => {
          setId(quitId);
          setQuitId(-2);
        }}
      />
    </Stack>
  );
};

export default PageWorksEdit;
