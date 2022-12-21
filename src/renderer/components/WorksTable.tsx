import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import useWorks from 'renderer/store/useWorks';
import { dateFormat } from '../../utils/date';

const colAmount = (field: string) => ({
  field,
  type: 'number',
  width: 80,
});
const WorksTable = () => {
  const { works, app, imApp, setId } = useWorks();

  const columns: GridColDef[] = [
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
    { field: 'owner', headerName: 'Owner', width: 200 },
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
            imApp((a) => {
              a.showDialogWorkEdit = true;
            });
            setId(+params.id);
          }}
        >
          <EditIcon />
        </Button>
      ),
    },
    { field: 'status', width: 80 },
    { field: 'team', width: 80 },
    { field: 'total', type: 'number', width: 80 },
    { field: 'paid', type: 'number', width: 80 },
    { field: 'labor_final', type: 'number', width: 80 },
    { field: 'material_final', type: 'number', width: 80 },
    { field: 'profit', type: 'number', width: 80 },
  ];
  return (
    <DataGrid
      rows={works}
      rowHeight={28}
      headerHeight={36}
      autoHeight
      columns={columns}
      // onCellEditStop={(e, v) => console.log(e.field, e.id, e.value)}
      // on
      // pageSize={100}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableSelectionOnClick
      hideFooter
      experimentalFeatures={{ newEditingApi: true }}
    />
  );
};

export default WorksTable;
