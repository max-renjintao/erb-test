/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { Box, Drawer, Stack } from '@mui/material';
import useApp from 'renderer/store/useApp';
import useWork from 'renderer/store/useWork';
import useWorks from 'renderer/store/useWorks';
import { useImmer } from 'use-immer';

import FormVehicle from './form/FormVehicle';
import FormNote from './form/FormNote';
import Reception from './doc/Reception';
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
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '100%', height: '100vh' }}>
        {/* <DataGridWorksFilter works={works} setRows={setRows} /> */}
        <DataGridWorks
          works={rows.filter((w) => w.status === status)}
          id={id}
          onRowClick={(ps) => (isEdited ? setQuitId(+ps.id) : setId(+ps.id))}
        />
      </Box>

      <Drawer
        variant="persistent"
        anchor="right"
        open={!!work}
        PaperProps={{ sx: { width: 900 } }}
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
            <Reception im={[work, imWork]} options={app.workOps} />
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
    </Box>
  );
};

export default PageWorksEdit;
