import { useMemo, useState } from 'react';
import { differenceInDays, getMonth, isValid } from 'date-fns';
import {
  Button,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from '@mui/material';
import useWorks from 'renderer/store/useWorks';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import { dateFormat } from 'utils/date';
import InText from 'renderer/components/inputs/InText';
import { STATUS, TEAMS } from 'renderer/store/constants';
import ObjectEntries from 'utils/ObjectEntries';
import { amount } from 'utils/disp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import BuildIcon from '@mui/icons-material/Build';
import SavingsIcon from '@mui/icons-material/Savings';
import WorksTable, { WorkRow } from './_page-works/WorksTable';
import DialogWork from './dialog-work';

const ARR1TO12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const WorksPage = () => {
  console.log('<WorksPage>');
  const { works, app, append, imApp } = useWorks();
  const [fMonth, setFMonth] = useState(ARR1TO12);
  const [fStatus, setFStatus] = useState(STATUS);
  const [fTeam, setFTeam] = useState(TEAMS);
  // const [filter, setFilter] = useState({ month: '10', status: 'all' });
  const rows: WorkRow[] = useMemo(() => {
    const rs = works
      .map((w, index) => ({
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
      }))
      .filter((f) => fMonth.includes(+f.date_s.slice(0, 2)))
      .filter((f) => fStatus.includes(f.status.toLowerCase()))
      .filter((f) => fTeam.includes(f.team))
      .sort((p, c) => p.sn - c.sn);

    return rs;
  }, [works, fMonth, fStatus, fTeam]);
  const sum = useMemo(() => {
    const res = { total: 0, paid: 0, labor_final: 0, profit: 0 };
    rows.forEach((row) => {
      ObjectEntries(res).forEach(([k, v]) => {
        res[k] = v + row[k];
      });
    });
    // return rows.length
    //   ? rows.reduce(
    //       (p, c) => ({
    //         total: p.total + c.total,
    //         paid: p.paid + c.paid,
    //         labor_final: p.labor_final + c.labor_final,
    //         profit: p.profit + c.profit,
    //       }),
    //       res
    //     )
    //   : res;
    return res;
  }, [rows]);
  console.log(sum);

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} p={0.6}>
        <Button onClick={() => setFMonth(fMonth.length === 12 ? [] : ARR1TO12)}>
          TEAM:
        </Button>
        <ToggleButtonGroup
          size="small"
          value={fMonth}
          onChange={(e, v) => {
            setFMonth(v);
          }}
        >
          <ToggleButton value={1}>1</ToggleButton>
          <ToggleButton value={2}>2</ToggleButton>
          <ToggleButton value={3}>3</ToggleButton>
          <ToggleButton value={4}>4</ToggleButton>
          <ToggleButton value={5}>5</ToggleButton>
          <ToggleButton value={6}>6</ToggleButton>
          <ToggleButton value={7}>7</ToggleButton>
          <ToggleButton value={8}>8</ToggleButton>
          <ToggleButton value={9}>9</ToggleButton>
          <ToggleButton value={10}>O</ToggleButton>
          <ToggleButton value={11}>N</ToggleButton>
          <ToggleButton value={12}>D</ToggleButton>
        </ToggleButtonGroup>
        <Button
          onClick={() =>
            setFStatus(fStatus.length === STATUS.length ? [] : STATUS)
          }
        >
          status:
        </Button>
        <ToggleButtonGroup
          size="small"
          value={fStatus}
          onChange={(e, v) => {
            setFStatus(v);
          }}
        >
          <ToggleButton value="old">OLD</ToggleButton>
          <ToggleButton value="quotation">QUOTATION</ToggleButton>
          <ToggleButton value="await">await</ToggleButton>
          <ToggleButton value="doing">doing</ToggleButton>
          <ToggleButton value="done">done</ToggleButton>
          <ToggleButton value="paid">paid</ToggleButton>
        </ToggleButtonGroup>

        <Button
          onClick={() => setFTeam(fTeam.length === TEAMS.length ? [] : TEAMS)}
        >
          TEAM:
        </Button>
        <ToggleButtonGroup
          size="small"
          value={fTeam}
          onChange={(e, v) => {
            setFTeam(v);
          }}
        >
          <ToggleButton value="汪攀">攀</ToggleButton>
          <ToggleButton value="王毅">毅</ToggleButton>
          <ToggleButton value="杨波">波</ToggleButton>
        </ToggleButtonGroup>

        <Typography
          variant="h6"
          component="div"
          sx={{ fontSize: '13px', flexGrow: 1, textAlign: 'right' }}
        >
          <strong>SUM:</strong>
        </Typography>

        <Chip avatar={<ShoppingCartIcon />} label={amount(sum.total, '0,0')} />
        <Chip avatar={<RequestQuoteIcon />} label={amount(sum.paid, '0,0')} />
        <Chip avatar={<BuildIcon />} label={amount(sum.labor_final, '0,0')} />
        <Chip avatar={<SavingsIcon />} label={amount(sum.profit, '0,0')} />
      </Stack>
      <WorksTable
        rows={rows}
        onEdit={(index) => {
          imApp((a) => {
            a.showDialogWorkEdit = true;
            a.index = index;
          });
        }}
      />

      <DialogWork />
      <Button onClick={() => append()}>Append</Button>
      {app.csvFilePath}
    </>
  );
};
export default WorksPage;
