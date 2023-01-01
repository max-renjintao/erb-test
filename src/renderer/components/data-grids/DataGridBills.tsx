import { Add } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export type DataGridNewRow = { id: number; sn: number; note: string } & Vehicle;

const columns = [
  { field: 'sn', width: 70 },
  { field: 'plate', width: 100 },
  { field: 'model', width: 120 },
  { field: 'mileage', type: 'number', width: 80 },
  { field: 'owner', width: 120 },
  { field: 'tel', width: 120 },
  { field: 'vip', width: 80 },
  { field: 'note', flex: 800 },
];

type P = {
  rows: DataGridNewRow[];
  onSelect: (index: number) => void;
  onAppend: () => void;
};

const DataGridBills = ({ rows, onSelect, onAppend }: P) => {
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={23}
        headerHeight={25}
        autoHeight
        disableColumnFilter
        disableColumnMenu
        // disableSelectionOnClick
        hideFooter
        onRowClick={(row) => onSelect(+row.id)}
      />
      <Button
        // size="small"
        startIcon={<Add />}
        sx={{ textAlign: 'left', padding: '1px 40px 1px 10px' }}
        onClick={onAppend}
      >
        new reception
      </Button>
    </div>
  );
};

export default DataGridBills;
