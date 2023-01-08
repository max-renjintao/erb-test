/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-props-no-spreading */
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DataGridProps } from '@mui/x-data-grid/models/props/DataGridProps';
import { differenceInDays, isValid } from 'date-fns';
import { useMemo } from 'react';
import { dateFormat } from 'utils/date';

export type WorkRow = { date_s: string; date_e: string; dur: number } & Omit<
  Partial<Work>,
  'date_s' | 'date_e'
>;
export const workToRow = ({ jobs, docOptions, ...w }: Work) => ({
  ...w,
  date_s: dateFormat(w.date_s, 'MM-dd'),
  date_e: dateFormat(w.date_e, 'MM-dd'),
  dur: isValid(w.date_s)
    ? differenceInDays(
        isValid(w.date_e) ? w.date_e : new Date(Date.now()),
        w.date_s
      ) + 1
    : 0,
});

const sn = { field: 'sn', width: 80 };
const date_s = { field: 'date_s', width: 60 };
const date_e = { field: 'date_e', width: 60 };
const dur = { field: 'dur', type: 'number', width: 20 };
const plate = { field: 'plate', width: 100 };
const model = { field: 'model', width: 130 };
const mileage = { field: 'mileage', type: 'number', width: 90 };
const owner = { field: 'owner', width: 150 };
const tel = { field: 'tel', width: 150 };
const vip = { field: 'vip', width: 150 };
const status = { field: 'status', width: 80 };
const team = { field: 'team', width: 30 };
const total = { field: 'total', type: 'number', width: 90 };
const paid = { field: 'paid', type: 'number', width: 90 };
const labor_final = { field: 'labor_final', type: 'number', width: 90 };
const profit = { field: 'profit', type: 'number', width: 90 };
const note: GridColDef<WorkRow> = { field: 'note', flex: 1 };

// const columns: GridColDef<WorkRow>[] = [
//   { field: 'sn', width: 80 },
//   { field: 'date_s', width: 60 },
//   { field: 'date_e', width: 60 },
//   { field: 'dur', type: 'number', width: 20 },
//   { field: 'plate', width: 100 },
//   { field: 'model', width: 130 },
//   { field: 'owner', headerName: 'Owner', width: 150 },
//   { field: 'note', width: 190 },
//   { field: 'status', width: 80 },
//   { field: 'team', width: 80 },
//   { field: 'total', type: 'number', width: 90 },
//   { field: 'paid', type: 'number', width: 90 },
//   { field: 'labor_final', type: 'number', width: 90 },
//   { field: 'profit', type: 'number', width: 90 },
// ];

const columns: GridColDef<WorkRow>[][] = [
  [],
  [sn, dur, plate, model, owner, note],
  [sn, date_s, dur, plate, model, mileage, owner, tel, vip, note],
  [sn, date_s, dur, plate, model, owner, team, note],
  [sn, dur, date_e, plate, model, owner, tel, team, total, note],
  [
    sn,
    date_s,
    dur,
    plate,
    model,
    owner,
    status,
    team,
    total,
    paid,
    labor_final,
    profit,
    note,
  ],
];
type DataGridWorksProps = { status: number; works: Work[]; id: number } & Omit<
  DataGridProps,
  'columns' | 'rows'
>;
const DataGridWorks = ({ status: s, works, id, ...ps }: DataGridWorksProps) => {
  const rows = useMemo(() => works.map(workToRow), [works]);
  return (
    <DataGrid
      rows={rows}
      columns={columns[s]}
      className="no-print"
      rowHeight={23}
      headerHeight={25}
      // disableColumnFilter
      // disableColumnMenu
      // hideFooter
      hideFooterSelectedRowCount
      experimentalFeatures={{ newEditingApi: true }}
      getRowClassName={(prams) =>
        `x-row-status-${prams.row.status}${
          // eslint-disable-next-line eqeqeq
          prams.id == id ? ' x-row-selected' : ''
        }`
      }
      {...ps}
    />
  );
};

export default DataGridWorks;
