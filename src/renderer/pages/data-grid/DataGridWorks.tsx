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
export const workToRow = (w: Work) => ({
  id: w.id,
  sn: w.sn,
  date_s: dateFormat(w.date_s, 'MM-dd'),
  date_e: dateFormat(w.date_e, 'MM-dd'),
  plate: w.plate,
  model: w.model,
  owner: w.owner,
  note: w.note,
  status: w.status,
  team: w.team,
  total: w.total,
  paid: w.paid,
  labor_final: w.labor_final,
  profit: w.profit,
  dur: isValid(w.date_s)
    ? differenceInDays(
        isValid(w.date_e) ? w.date_e : new Date(Date.now()),
        w.date_s
      ) + 1
    : 0,
});

const columns: GridColDef<WorkRow>[] = [
  { field: 'sn', width: 80 },
  { field: 'date_s', width: 60 },
  { field: 'date_e', width: 60 },
  { field: 'dur', type: 'number', width: 20 },
  { field: 'plate', width: 100 },
  { field: 'model', width: 130 },
  { field: 'owner', headerName: 'Owner', width: 150 },
  { field: 'note', width: 190 },
  { field: 'status', width: 80 },
  { field: 'team', width: 80 },
  { field: 'total', type: 'number', width: 90 },
  { field: 'paid', type: 'number', width: 90 },
  { field: 'labor_final', type: 'number', width: 90 },
  { field: 'profit', type: 'number', width: 90 },
];

type DataGridWorksProps = { works: Work[]; id: number } & Omit<
  DataGridProps,
  'columns' | 'rows'
>;
const DataGridWorks = ({ works, id, ...rest }: DataGridWorksProps) => {
  const rows = useMemo(() => works.map(workToRow), [works]);
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      className="no-print"
      rowHeight={23}
      headerHeight={25}
      disableColumnFilter
      disableColumnMenu
      hideFooter
      experimentalFeatures={{ newEditingApi: true }}
      getRowClassName={(ps) =>
        `x-row-status-${ps.row.status}${
          // eslint-disable-next-line eqeqeq
          ps.id == id ? ' x-row-selected' : ''
        }`
      }
      {...rest}
    />
  );
};

export default DataGridWorks;
