import {
  Button,
  Slider,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { getMonth } from 'date-fns';
import { useEffect, useState } from 'react';

const ARR0TO5 = [0, 1, 2, 3];
type P = { works: Work[]; setRows: (ws: Work[]) => void };
const Filter4 = ({ works, setRows }: P) => {
  const [filter, setFilter] = useState(true);
  const [fMonth, setFMonth] = useState([1, 12]);
  // const [fStatus, setFStatus] = useState(false);
  const [fTeam, setFTeam] = useState(ARR0TO5);
  useEffect(() => {
    console.log(filter, works.length);

    if (filter)
      setRows(
        works
          .filter(
            (w) =>
              getMonth(w.date_e) + 1 >= fMonth[0] &&
              getMonth(w.date_e) + 1 <= fMonth[1]
          )
          // .filter((w) => (fStatus ? w.status >= 3 : w.status === 3))
          .filter((f) => fTeam.includes(f.team))
      );
    else setRows(works);
  }, [works, filter, fMonth, setRows, fTeam]);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Button size="small" disabled>
        month:
      </Button>
      <small style={{ width: '15px' }}>{fMonth[0]}</small>

      <Slider
        disabled={!filter}
        size="small"
        sx={{ width: 200 }}
        step={1}
        marks
        min={1}
        max={12}
        value={fMonth}
        onChange={(e, v) => setFMonth(v as number[])}
        valueLabelDisplay="auto"
      />

      <small style={{ width: '15px' }}>{fMonth[1]}</small>
      <Button size="small" disabled>
        show Done
      </Button>
      {/* <Checkbox
        size="small"
        disabled={!filter}
        checked={fStatus}
        onChange={(e) => setFStatus(e.target.checked)}
      /> */}

      <Button
        size="small"
        disabled={!filter}
        onClick={() => setFTeam(fTeam.length === ARR0TO5.length ? [] : ARR0TO5)}
      >
        TEAM:
      </Button>
      <ToggleButtonGroup
        disabled={!filter}
        size="small"
        value={fTeam}
        onChange={(e, v) => {
          setFTeam(v);
        }}
        // exclusive
      >
        {[0, 1, 2, 3].map((n) => (
          <ToggleButton key={n} value={n} sx={{ height: 25 }}>
            {n}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Switch
        size="small"
        checked={filter}
        onChange={() => setFilter((f) => !f)}
      />
    </Stack>
  );
};

export default Filter4;
