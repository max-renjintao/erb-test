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

const ARR1TO12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const ARR0TO5 = [0, 1, 2, 3, 4, 5];

type P = { works: Work[]; setRows: (ws: Work[]) => void };
const DataGridWorksFilter = ({ works, setRows: setWs }: P) => {
  const [filter, setFilter] = useState(false);
  const [fMonth, setFMonth] = useState([1, 12]);
  const [fStatus, setFStatus] = useState([0, 5]);
  const [fTeam, setFTeam] = useState(ARR0TO5);
  useEffect(() => {
    console.log(filter, works.length);

    if (filter)
      setWs(
        works
          .filter(
            (f) =>
              getMonth(f.date_s) + 1 >= fMonth[0] &&
              getMonth(f.date_s) + 1 <= fMonth[1]
          )
          .filter((f) => f.status >= fStatus[0] && f.status <= fStatus[1])
          .filter((f) => fTeam.includes(f.team))
      );
    else setWs(works);
  }, [works, filter, fMonth, fStatus, fTeam, setWs]);

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
        status:
      </Button>
      <Slider
        disabled={!filter}
        size="small"
        sx={{ width: 100 }}
        step={1}
        marks
        min={0}
        max={5}
        value={fStatus}
        onChange={(e, v) => setFStatus(v as number[])}
        valueLabelDisplay="auto"
      />

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
        value={filter}
        onChange={() => setFilter((f) => !f)}
      />
    </Stack>
  );
};

export default DataGridWorksFilter;
