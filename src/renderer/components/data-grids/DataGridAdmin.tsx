import Button from '@mui/material/Button';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { dateFormat } from 'utils/date';
import { differenceInDays, isValid } from 'date-fns';
import { ReactNode, useMemo } from 'react';
import { IconButton } from '@mui/material';

type P = { works: Work[]; onRowSelect: (id: number) => void } & Omit<
  DataGridProps,
  'columns' | 'rows'
>;
const DataGridAdmin = ({ works, onRowSelect, ...props }: P) => {
  // // const { works, imApp, setId } = useWorks();
  // console.log('<WorksTable>');
  const rows = useMemo(
    () =>
      works.map((w, index) => ({
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
        edit: index,
      })),
    [works]
  );
  const columns = [
    { field: 'sn', width: 80 },
    { field: 'date_s', width: 60 },
    { field: 'date_e', width: 60 },
    { field: 'dur', type: 'number', width: 20 },
    { field: 'plate', width: 100 },
    { field: 'model', width: 130 },
    { field: 'owner', headerName: 'Owner', width: 150 },
    { field: 'note', width: 190 },
    {
      field: 'edit',
      sortable: false,
      width: 60,
      renderCell: (ps: any) => (
        <IconButton size="small" onClick={() => onRowSelect(ps.value)}>
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
    { field: 'status', width: 80 },
    { field: 'team', width: 80 },
    { field: 'total', type: 'number', width: 90 },
    { field: 'paid', type: 'number', width: 90 },
    { field: 'labor_final', type: 'number', width: 90 },
    { field: 'profit', type: 'number', width: 90 },
  ];
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowHeight={23}
      headerHeight={25}
      autoHeight
      disableColumnFilter
      disableColumnMenu
      // onCellEditStop={(e, v) => console.log(e.field, e.id, e.value)}
      // on
      // pageSize={100}
      rowsPerPageOptions={[5]}
      // checkboxSelection
      disableSelectionOnClick
      hideFooter
      experimentalFeatures={{ newEditingApi: true }}
      getRowClassName={(params) => `x-row-status-${params.row.status}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default DataGridAdmin;
