/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { Button, Drawer, Stack } from '@mui/material';
import useApp from 'renderer/store/useApp';
import useWork from 'renderer/store/useWork';
import useWorks from 'renderer/store/useWorks';
import { workInit } from 'constants/const-work';
import { useImmer } from 'use-immer';

import { Add, Delete } from '@mui/icons-material';
import DocPaid from 'renderer/components/doc/DocPaid';
import AlertDialog from 'renderer/layouts/AlertDialog';
import FormAdmin from './form/FormAdmin';
import QuitAlert from './dialog/QuitAlert';
import DataGridWorks from './data-grid/DataGridWorks';
import DocHeader from './doc/DocHeader';
import DocVehicle from './doc/DocVehicle';
import DocNeeds from './doc/DocNeeds';
import DocJobsAndMats from './doc/DocJobsAndMats';

import DocNotice from './doc/DocNotice';
import DocBill from './doc/DocBill';
import DocFooter from './doc/DocFooter';
import DataGridWorksFilter from './data-grid/DataGridWorksFilter';
import FormBase from './form/FormBase';
import FormNote from './form/FormNote';

type P = { status: number };
const PageWorksEdit = ({ status }: P) => {
  const { app } = useApp();
  const { works, append, remove: removeById } = useWorks();
  const [id, setId] = useState(-1);
  const [quitId, setQuitId] = useState(-2);
  const { work, imWork, update, remove, isEdited } = useWork(id);
  const [rows, setRows] = useImmer<Work[]>([]);
  // useEffect(() => setRows(works), [works]);
  useEffect(() => setId(-1), [status]);
  const [delDialog, setDelDialog] = useState(false);
  const imm = [work, imWork] as ImmWork;
  const docProps = {
    imm,
    options: app.options,
    disabled: status < work?.status,
  };

  const statusRows =
    status === 5
      ? rows
      : rows.filter((w) =>
          status === 1 ? w.status === 5 || w.status === 1 : w.status === status
        );
  return (
    <Stack sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <DataGridWorks
        status={status}
        works={statusRows}
        id={id}
        onRowClick={(ps) => (isEdited ? setQuitId(+ps.id) : setId(+ps.id))}
        hideFooter={statusRows.length < 100}
      />
      <Stack direction="row">
        {status <= 2 && (
          <>
            <Button
              startIcon={<Add fontSize="small" />}
              size="small"
              onClick={() => {
                const newWork = work || workInit;
                const now = new Date(Date.now());
                append({ ...newWork, status, date_s: now, date_e: now });
              }}
            >
              {work ? 'copy' : 'Append'}
            </Button>
            <Button
              startIcon={<Delete fontSize="small" />}
              color="error"
              size="small"
              onClick={() => setDelDialog(true)}
            >
              Remove the Last work
            </Button>
            <AlertDialog title="Delete the last work" open={delDialog}>
              <Button
                color="error"
                onClick={() => {
                  const delId = statusRows[statusRows.length - 1].id;
                  const delWork = works[delId];
                  if (delWork.status === status) {
                    removeById(delId);
                    setDelDialog(false);
                  } else {
                    window.alert(
                      `warning!
                      sorry you have no authority to delete the last work!
                      sn.${delWork.sn}`
                    );
                  }
                }}
              >
                Delete right now
              </Button>
              <Button onClick={() => setDelDialog(false)}>Cancel</Button>
            </AlertDialog>
          </>
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
            <div className="no-print">
              <FormAdmin
                status={status}
                imm={[work, imWork]}
                update={update}
                remove={remove}
                isEdited={isEdited}
                onClose={() => (isEdited ? setQuitId(-1) : setId(-1))}
              />
              {status > 4 && <FormBase imm={imm} />}
              <FormNote imm={imm} />
            </div>
            <div className="doc-paper">
              <DocHeader work={work} />
              <DocVehicle {...docProps} />
              {work.status !== 1 && <DocNeeds {...docProps} />}
              {(work.status === 1 || work.status > 3) && (
                <DocJobsAndMats
                  {...docProps}
                  full={work.status === 1 || work.status > 3}
                />
              )}

              {(work.status === 1 || work.status > 3) && (
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
