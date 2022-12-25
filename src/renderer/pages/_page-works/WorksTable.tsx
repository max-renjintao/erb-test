import Button from '@mui/material/Button';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { dateFormat } from 'utils/date';
import { differenceInDays, isValid } from 'date-fns';
import { ReactNode } from 'react';

export type WorkRow = {
  id: number;
  sn: number;
  date_s: string;
  date_e: string;
  model: string;
  dur: number;
  plate: string;
  owner: string;
  note: string;
  edit: number;
  status: string;
  team: string;
  total: number;
  paid: number;
  labor_final: number;
  profit: number;
};

type P = { rows: WorkRow[]; onEdit: (id: number) => void } & Omit<
  DataGridProps,
  'columns'
>;
const WorksTable = ({ rows, onEdit, ...props }: P) => {
  // const { works, imApp, setId } = useWorks();
  console.log('<WorksTable>');

  const columns: GridColDef<WorkRow>[] = [
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
      hideSortIcons: true,
      width: 60,
      renderCell: (ps) => (
        <Button size="small" onClick={() => onEdit(ps.value)}>
          <EditIcon />
        </Button>
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
      getRowClassName={(params) =>
        `x-row-${(params.row.status as string).toLowerCase()}`
      }
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default WorksTable;
