/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */

import { useCallback, useEffect, useState } from 'react';
import { Button, Drawer, Stack } from '@mui/material';
import useApp from 'renderer/store/useApp';
import useWork from 'renderer/store/useWork';
import useWorks from 'renderer/store/useWorks';
import { workInit } from 'constants/const-work';
import { useImmer } from 'use-immer';

import { Add, Delete } from '@mui/icons-material';
import DocPaid from 'renderer/doc-paper/DocPaid';
import FormAdmin from 'renderer/form/FormAdmin';
import DlgQuit from 'renderer/components/ui/DlgQuit';
import DataGridWorks from 'renderer/data-grid/DataGridWorks';
import DocHeader from 'renderer/doc-paper/DocHeader';
import DocVehicle from 'renderer/doc-paper/DocVehicle';
import DocNeeds from 'renderer/doc-paper/DocNeeds';
import DocJobsAndMats from 'renderer/doc-paper/DocJobsAndMats';

import DocNotice from 'renderer/doc-paper/DocNotice';
import DocBill from 'renderer/doc-paper/DocBill';
import DocFooter from 'renderer/doc-paper/DocFooter';
import DataGridWorksFilter from 'renderer/data-grid/DataGridWorksFilter';
import FormBase from 'renderer/form/FormBase';
import FormNote from 'renderer/form/FormNote';
import RowsSummary from 'renderer/data-grid/RowsSummary';
import BtnWithAlert from 'renderer/components/ui/BtnWithAlert';
import Btn from 'renderer/components/ui/Btn';
import Filter3 from 'renderer/data-grid/Filter3';
import Filter4 from 'renderer/data-grid/Filter4';

type P = { pageStatus: number };
const PageWorksEdit = ({ pageStatus }: P) => {
  const { app } = useApp();
  const { works, append, remove: removeById } = useWorks();
  const [id, setId] = useState(-1);
  const [quitId, setQuitId] = useState(-2);
  const { work, imWork, update, remove, isEdited } = useWork(id);
  const [rows, setRows] = useImmer<Work[]>([]);
  useEffect(() => setId(-1), [pageStatus]);
  const imm = [work, imWork] as ImmWork;
  const docProps = {
    imm,
    options: app.options,
    disabled: pageStatus < work?.status,
  };

  const statusRows =
    pageStatus === 5
      ? rows
      : pageStatus === 3 && app.usr === 3
      ? rows.filter((w) => w.status >= 3 && w.team === app.team)
      : pageStatus === 1
      ? rows.filter((w) => w.status === 5 || w.status === 1)
      : rows.filter((w) => w.status === pageStatus);

  const pu = useCallback(
    (...users: number[]) => users.includes(pageStatus),
    [pageStatus]
  );
  const au = useCallback(
    (...users: number[]) => users.includes(app.usr),
    [app.usr]
  );
  const wu = useCallback(
    (...users: number[]) => users.includes(work?.status),
    [work?.status]
  );
  const DataGrid = (
    <DataGridWorks
      status={pageStatus}
      works={statusRows}
      id={id}
      onRowClick={(ps) => (isEdited ? setQuitId(+ps.id) : setId(+ps.id))}
      hideFooter={statusRows.length < 100}
    />
  );
  const Foot = (
    <Stack direction="row">
      {pu(1, 2, 4, 5) && (
        <>
          <Btn
            startIcon={<Add fontSize="small" />}
            text={work ? 'Copy' : 'Append'}
            onClick={() => {
              const newWork = work || workInit;
              const now = new Date(Date.now());
              append({
                ...newWork,
                status: pageStatus,
                date_s: now,
                date_e: now,
              });
            }}
          />

          <BtnWithAlert
            startIcon={<Delete fontSize="small" />}
            color="error"
            text="Remove"
            title="Delete the last work"
            btnProps={[
              {
                color: 'error',
                children: 'Delete right now',
                onClick: () => {
                  const delId = statusRows[statusRows.length - 1].id;
                  const delWork = works[delId];
                  if (delWork.status === pageStatus) {
                    removeById(delId);
                  } else {
                    window.alert(
                      `warning!
              sorry you have no authority to delete the last work!
              sn.${delWork.sn}`
                    );
                  }
                },
              },
            ]}
          />
        </>
      )}
      {au(5) && <DataGridWorksFilter works={works} setRows={setRows} />}
      {au(4) && <Filter4 works={works} setRows={setRows} />}
      {au(3) && <Filter3 works={works} setRows={setRows} />}
      <span style={{ flexGrow: 1 }} />
      <RowsSummary
        rows={statusRows}
        total={au(4, 5)}
        paid={au(4, 5)}
        labor={au(3, 5)}
        profit={au(5)}
      />
    </Stack>
  );

  const Form = (
    <div className="no-print">
      <FormAdmin
        usr={app.usr}
        imm={[work, imWork]}
        update={update}
        remove={remove}
        isEdited={isEdited}
        onClose={() => (isEdited ? setQuitId(-1) : setId(-1))}
      />
      {au(4, 5) && <FormBase imm={imm} />}
      <FormNote imm={imm} />
    </div>
  );
  const Doc = (
    <div className="doc-paper">
      <DocHeader {...docProps} />
      <DocVehicle {...docProps} />
      {wu(2, 3, 4, 5) && <DocNeeds {...docProps} />}
      {wu(3) && <DocJobsAndMats {...docProps} full={false} />}
      {wu(1, 4, 5) && <DocJobsAndMats {...docProps} full />}
      {wu(1, 4, 5) && (
        <Stack
          pt={1}
          direction="row"
          height={230}
          justifyContent="space-between"
        >
          <DocPaid {...docProps} />
          <DocNotice {...docProps} style={{ width: '65%' }} />
          <DocBill {...docProps} style={{ width: '31%' }} />
        </Stack>
      )}
      <DocFooter {...docProps} />
    </div>
  );
  return (
    <Stack sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      {DataGrid}
      {Foot}

      <Drawer
        variant="persistent"
        anchor="right"
        className="bg-white"
        open={!!work}
        PaperProps={{ className: 'bg-white', sx: { width: 880 } }}
      >
        {work && Form}
        {work && Doc}
      </Drawer>

      <DlgQuit
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
