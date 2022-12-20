import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import useWorks from 'renderer/store/useWorks';
import { formatDistance, formatDistanceStrict } from 'date-fns';
import { dateFormat } from '../../utils/date';

const WorksTable = () => {
  const { works, setId } = useWorks();

  const columns: GridColDef[] = [
    { field: 'sn', width: 80 },
    {
      field: 'date_s',
      type: 'date',
      headerName: 'Start',
      width: 60,
      editable: false,
      renderCell: (ps: GridRenderCellParams<Date>) => dateFormat(ps.value),
    },
    {
      field: 'date_e',
      type: 'date',
      headerName: 'End',
      width: 60,
      editable: false,
      renderCell: (ps: GridRenderCellParams<Date>) => {
        // console.log('ps.value', ps.value);

        return dateFormat(ps.value);
      },
    },
    // {
    //   field: 'dur',
    //   type: 'number',
    //   width: 40,
    //   // filterable: false,
    //   renderCell: (ps: GridRenderCellParams<number>) => {
    //     const dur = +formatDistanceStrict(
    //       ps.row.date_e || new Date(Date.now()),
    //       ps.row.date_s || new Date(2022, 1, 1),
    //       { unit: 'day' }
    //     ).slice(0, -5);
    //     // console.log('dur:', dur);
    //     return dur + 1;
    //     // return dur < 99 ? dur + 1 : 99;
    //   },
    // },
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
        <Button size="small" onClick={() => setId(+params.id)}>
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
      valueGetter: (params) => params.row.total,
    },
    { field: 'note', width: 190 },
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
