/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Autocomplete,
  Box,
  Button,
  Radio,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import useWork from 'renderer/store/useWork';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { TxtIn } from '../InvoiceTable';

const workEditInfo = () => {
  const [confirmDel, setConfirmDel] = useState('');
  const { id, work, setWorkImmer, update, remove, setId } = useWork();
  return (
    <>
      <Stack direction="row" spacing={1} className="no-print" px={2} pt={2}>
        <TxtIn
          label="sn"
          type="number"
          sx={{ width: 90 }}
          value={work.sn}
          onChange={(e) =>
            setWorkImmer((dw) => {
              dw.sn = +e.target.value;
            })
          }
        />
        <TxtIn
          label="Start"
          type="date"
          value={work.date_s}
          onChange={(e) =>
            setWorkImmer((dw) => {
              dw.date_s = new Date(e.target.value);
            })
          }
        />
        <TxtIn
          label="End"
          type="date"
          value={work.date_e}
          onChange={(e) =>
            setWorkImmer((dw) => {
              dw.date_e = new Date(e.target.value);
            })
          }
        />
        <span style={{ width: 100 }} />
        <Autocomplete
          freeSolo
          options={['汪攀', '王毅', '杨波']}
          sx={{ width: 100 }}
          renderInput={(params) => <TxtIn {...params} />}
          value={work.team}
          onChange={(e, v) =>
            v &&
            setWorkImmer((dw) => {
              dw.team = v;
            })
          }
        />
        <Autocomplete
          freeSolo
          options={['PAID', 'DONE', 'Doing', 'Quotation', 'Await']}
          disableClearable
          disablePortal
          sx={{ width: 100 }}
          renderInput={(params) => <TxtIn {...params} />}
          value={work.status}
          onChange={(e, v) =>
            v &&
            setWorkImmer((dw) => {
              dw.status = v;
            })
          }
        />

        <Box ml="auto" mr="0">
          <TextField
            size="small"
            sx={{ width: 90 }}
            value={confirmDel}
            onChange={(e) => setConfirmDel(e.target.value)}
          />
          <Button
            onClick={() => {
              if (confirmDel.toLowerCase() === 'delete') {
                remove(id);
                setId(0);
              }
            }}
          >
            Delete
          </Button>
        </Box>
      </Stack>
      <Stack px={2} className="no-print">
        <TxtIn
          multiline
          label="note"
          maxRows={5}
          value={work.note}
          onChange={(e) =>
            setWorkImmer((d) => {
              d.note = e.target.value;
            })
          }
        />
      </Stack>
      <Stack
        className="no-print"
        direction="row"
        spacing={1}
        justifyContent="end"
        alignItems="center"
        px={4}
      >
        <Box mr="auto">
          <span>
            En
            <Radio
              // checked={ui.en && !ui.zh}
              // onChange={() => setUi((s) => ({ ...s, en: true, zh: false }))}
              inputProps={{ 'aria-label': 'A' }}
            />
            <Radio
              // checked={ui.en && ui.zh}
              // onChange={() => setUi((s) => ({ ...s, en: true, zh: true }))}
              inputProps={{ 'aria-label': 'B' }}
            />
            <Radio
              // checked={!ui.en && ui.zh}
              // onChange={() => setUi((s) => ({ ...s, en: false, zh: true }))}
              inputProps={{ 'aria-label': 'B' }}
            />
            中
          </span>
          Show Tax
          <Switch
            // defaultChecked={ui.discount}
            // onChange={(e, v) => setUi((s) => ({ ...s, discount: v }))}
            size="small"
          />
          Show Discount
        </Box>
        <Button
          startIcon={<PrintIcon />}
          onClick={() => window.electron.ipcRenderer.sendMessage('print', [])}
          children="print"
        />
        <Button
          startIcon={<SaveIcon />}
          onClick={() => update(work)}
          children="save"
        />
        <Button
          startIcon={<CloseIcon />}
          onClick={() => setId(0)}
          children="quit"
        />
      </Stack>
    </>
  );
};

export default workEditInfo;
