import Button from '@mui/material/Button';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { dateFormat } from 'utils/date';

// const colAmount = (field: string) => ({
//   field,
//   type: 'number',
//   width: 80,
// });
type P = { onEdit: (id: number) => void } & Omit<DataGridProps, 'columns'>;
const WorksTable = ({ rows, onEdit, ...props }: P) => {
  // const { works, imApp, setId } = useWorks();
  console.log('<WorksTable>');

  const columns: GridColDef<Work>[] = [
    { field: 'sn', width: 80 },
    {
      field: 'date_s',
      type: 'date',
      width: 60,
      renderCell: (ps: GridRenderCellParams<Date>) =>
        dateFormat(ps.value, 'MM-dd'),
    },
    {
      field: 'date_e',
      type: 'date',
      width: 60,
      renderCell: (ps: GridRenderCellParams<Date>) =>
        dateFormat(ps.value, 'MM-dd'),
    },
    { field: 'plate', width: 100 },
    { field: 'model', width: 130 },
    { field: 'owner', headerName: 'Owner', width: 150 },
    // { field: 'labor', width: 90 },
    // { field: 'material', width: 90 },
    // { field: 'tax', width: 30, type: 'number' },
    // { field: 'mileage', width: 100, type: 'number' },
    { field: 'note', width: 190 },
    {
      field: 'edit',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      hideSortIcons: true,
      width: 60,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <Button
          size="small"
          onClick={() => {
            onEdit(+params.id);
            // imApp((a) => {
            //   a.showDialogWorkEdit = true;
            // });
            // setId(+params.id);
          }}
        >
          <EditIcon />
        </Button>
      ),
    },
    { field: 'status', width: 80 },
    { field: 'team', width: 80 },

    { field: 'total', type: 'number', width: 90 },
    { field: 'paid', type: 'number', width: 90 },
    { field: 'labor_final', type: 'number', width: 90 },
    { field: 'material_final', type: 'number', width: 90 },
    { field: 'profit', type: 'number', width: 90 },
  ];
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowHeight={23}
      headerHeight={25}
      autoHeight
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
