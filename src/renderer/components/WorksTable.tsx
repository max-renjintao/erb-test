import { ButtonGroup, Dialog } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const WorksTable = ({
  data,
  onEdit,
}: {
  data: Work[];
  onEdit: (id: number) => void;
}) => {
  const columns: GridColDef[] = [
    { field: 'sn', width: 80 },
    {
      field: 'date_s',
      headerName: 'Start',
      width: 60,
      editable: false,
      renderCell: (ps: GridRenderCellParams<Date>) => ps.row.date_s.slice(5),
    },
    {
      field: 'date_e',
      headerName: 'End',
      width: 60,
      editable: false,
      renderCell: (ps: GridRenderCellParams<Date>) => ps.row.date_e.slice(5),
    },
    { field: 'plate', width: 100 },
    { field: 'model', width: 150 },
    { field: 'owner', headerName: 'Owner', width: 200 },
    // { field: 'labor', width: 90 },
    // { field: 'material', width: 90 },
    // { field: 'tax', width: 30, type: 'number' },

    { field: 'mileage', width: 100, type: 'number' },
    {
      field: 'edit',
      sortable: false,
      width: 60,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <Button size="small" onClick={() => onEdit(+params.id)}>
          <EditIcon />
        </Button>
      ),
    },
    { field: 'status', width: 80 },
    { field: 'team', width: 80 },
    {
      field: 'total',
      description: 'Total Amount',
      type: 'number',
      width: 100,
      valueGetter: (params) => params.row.labor / 1 + params.row.material / 1,
    },
    { field: 'note', width: 190 },
  ];
  return (
    <DataGrid
      rows={data}
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
