import { Chip, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import ObjectEntries from 'utils/ObjectEntries';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import BuildIcon from '@mui/icons-material/Build';
import SavingsIcon from '@mui/icons-material/Savings';
import { amount } from 'utils/disp';

type P = { rows: { [k: string]: any }[] };
const RowsSummary = ({ rows }: P) => {
  const sum = useMemo(() => {
    const res = { total: 0, paid: 0, labor_final: 0, profit: 0 };
    rows.forEach((row) => {
      ObjectEntries(res).forEach(([k, v]) => {
        res[k] = v + row[k];
      });
    });
    return res;
  }, [rows]);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography
        variant="h6"
        component="div"
        sx={{ fontSize: '13px', flexGrow: 1, textAlign: 'right' }}
      >
        <strong>SUM:</strong>
      </Typography>
      <Chip
        size="small"
        avatar={<ShoppingCartIcon />}
        label={amount(sum.total, '0,0')}
      />
      <Chip
        size="small"
        avatar={<RequestQuoteIcon />}
        label={amount(sum.paid, '0,0')}
      />
      <Chip
        size="small"
        avatar={<BuildIcon />}
        label={amount(sum.labor_final, '0,0')}
      />
      <Chip
        size="small"
        avatar={<SavingsIcon />}
        label={amount(sum.profit, '0,0')}
      />
    </Stack>
  );
};

export default RowsSummary;
