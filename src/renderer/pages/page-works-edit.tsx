/* eslint-disable react/jsx-props-no-spreading */
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
import DocPaid from 'renderer/components/doc/DocPaid';
import Form from './form/Form';
import QuitAlert from './dialog/QuitAlert';
import DataGridWorks from './data-grid/DataGridWorks';
import DocHeader from './doc/DocHeader';
import DocVehicle from './doc/DocVehicle';
import DocNeeds from './doc/DocNeeds';
import DocJobsAndMats from './doc/DocJobsAndMats';
import DocJobsNoCost from './doc/DocJobsNoCost';

import DocNotice from './doc/DocNotice';
import DocBill from './doc/DocBill';
import DocFooter from './doc/DocFooter';
import DataGridWorksFilter from './data-grid/DataGridWorksFilter';

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

  const docProps = {
    imm: [work, imWork] as ImmWork,
    options: app.options,
    disabled: status < work?.status,
  };
  return (
    <Stack sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
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
        <DataGridWorksFilter works={works} setRows={setRows} />
      </Stack>

      <Drawer
        variant="persistent"
        anchor="right"
        open={!!work}
        PaperProps={{ sx: { width: 920 } }}
      >
        {work && (
          <>
            <Form
              im={[work, imWork]}
              update={update}
              // remove={remove}
              isEdited={isEdited}
              onClose={() => (isEdited ? setQuitId(-1) : setId(-1))}
            />

            <div className="doc-paper">
              <DocHeader work={work} />
              <DocVehicle {...docProps} />
              <DocNeeds {...docProps} />
              {work.status > 3 && <DocJobsAndMats {...docProps} />}
              {work.status === 3 && (
                <DocJobsNoCost imm={[work, imWork]} options={app.options} />
              )}
              {work.status > 3 && (
                <Stack
                  pt={1}
                  direction="row"
                  height={230}
                  justifyContent="space-between"
                >
                  {work.status === 5 && <DocPaid />}
                  <DocNotice {...docProps} style={{ width: '65%' }} />
                  <DocBill {...docProps} style={{ width: '33%' }} />
                </Stack>
              )}
              <DocFooter />
            </div>
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
