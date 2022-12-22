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
import { dateFormat, dateParse } from 'utils/date';
import { TxtIn } from '../InvoiceTable';

const workEditInfo = () => {
  const [confirmDel, setConfirmDel] = useState('');
  const { app, imApp, setId, work, imWork, update, remove } = useWork();
  return (
    <>
      <Stack direction="row" spacing={1} className="no-print" px={2} pt={2}>
        <TxtIn
          label="sn"
          type="number"
          sx={{ width: 90 }}
          defaultValue={work.sn}
          onBlur={(e) =>
            imWork((dw) => {
              dw.sn = +e.target.value;
            })
          }
        />
        <TxtIn
          label="Start"
          type="date"
          defaultValue={dateFormat(work.date_s)}
          onBlur={(e) =>
            imWork((dw) => {
              dw.date_s = dateParse(e.target.value);
            })
          }
        />
        <TxtIn
          label="End"
          type="date"
          defaultValue={dateFormat(work.date_e)}
          onBlur={(e) =>
            imWork((dw) => {
              dw.date_e = dateParse(e.target.value);
            })
          }
        />
        <TxtIn
          label="paid amount"
          type="number"
          sx={{ width: 90 }}
          defaultValue={work.paid}
          onBlur={(e) =>
            imWork((dw) => {
              dw.paid = +e.target.value;
            })
          }
        />
        <span style={{ width: 100 }} />
        <Autocomplete
          freeSolo
          options={['汪攀', '王毅', '杨波']}
          sx={{ width: 100 }}
          renderInput={(params) => <TxtIn {...params} />}
          defaultValue={work.team}
          onChange={(e, v) =>
            imWork((dw) => {
              dw.team = `${v}`;
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
            imWork((dw) => {
              dw.status = v;
            })
          }
        />
      </Stack>
      <Stack direction="row" spacing={1} className="no-print" px={2} pt={2}>
        {' '}
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
                const i = app.index;
                imApp((a) => {
                  a.showDialogWorkEdit = false;
                });
                setId(0);
                remove(i);
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
          defaultValue={work.note}
          onBlur={(e) =>
            imWork((d) => {
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
          onClick={() => {
            imApp((a) => {
              a.showDialogWorkEdit = false;
            });
          }}
          children="quit"
        />
      </Stack>
    </>
  );
};

export default workEditInfo;
