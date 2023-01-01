/* eslint-disable react/no-array-index-key */
import { Add, Work } from '@mui/icons-material';
import { Button, SpeedDial, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormWrap from 'renderer/components/Form/Form';
import InAuto from 'renderer/components/inputs/InAuto';
import InImAuto from 'renderer/components/inputs/InImAuto';
import InImText from 'renderer/components/inputs/InImText';
import InNum from 'renderer/components/inputs/InNum';
import InText from 'renderer/components/inputs/InText2';
import { ImmerHook } from 'use-immer';
import { amount } from 'utils/disp';

const FormJobs = ({
  im,
  options,
}: {
  im: ImmerHook<Work>;
  options: WorkOptions;
}) => {
  const [work, imWork] = im;
  return (
    <FormWrap title="Maintenance Items and Expense List 维修项目及费用清单">
      {work.jobs.map((job, jobId) => (
        <div
          key={jobId}
          style={{
            boxShadow: '0 -2px 0 #777',
            backgroundColor: jobId % 2 === 0 ? undefined : '#f6f6f6',
          }}
        >
          <Stack direction="row" alignItems="end">
            <InAuto
              pl="20px"
              sx={{ width: 120 }}
              label={jobId + 1}
              value={job.code}
              onEdit={(v) =>
                imWork((w) => {
                  w.jobs[jobId].code = v;
                })
              }
              options={options.jobs.map((j) => j.code)}
            />
            <InAuto
              pl="5px"
              multiline
              sx={{ width: '390px' }}
              value={job.item}
              onEdit={(v) =>
                imWork((w) => {
                  w.jobs[jobId].item = v;
                })
              }
              options={options.jobs.map((j) => j.item)}
            />
            <InNum
              pl="5px"
              type="number"
              sx={{ width: '70px' }}
              value={job.cost}
              onEdit={(v) =>
                imWork((w) => {
                  w.jobs[jobId].cost = +v;
                })
              }
            />
          </Stack>
          {job.mats.map((mat, matId) => (
            <Stack direction="row" alignItems="end" pl="120px">
              <InAuto
                pl="5px"
                multiline
                sx={{ width: '300px' }}
                value={mat.name}
                onEdit={(v) =>
                  imWork((w) => {
                    w.jobs[jobId].mats[matId].name = v;
                  })
                }
                options={options.mats.map((m) => m.name)}
              />
              <InNum
                value={mat.qty}
                sx={{ width: '50px' }}
                onEdit={(v) =>
                  imWork((w) => {
                    w.jobs[jobId].mats[matId].qty = +v;
                  })
                }
              />

              <InNum
                value={mat.rate}
                sx={{ width: '70px' }}
                onEdit={(v) =>
                  imWork((w) => {
                    w.jobs[jobId].mats[matId].rate = +v;
                  })
                }
              />
              <Box component="span" ml="auto" mr={2} fontSize={10}>
                {amount(mat.qty * mat.rate, '0')}
              </Box>
            </Stack>
          ))}
          <Stack direction="row">
            <IconButton size="small">
              <Add fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <Add fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <Add fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <Add fontSize="small" />
            </IconButton>
            <Box ml="auto" mr={5}>
              <IconButton size="small">
                <Add fontSize="small" />
              </IconButton>
            </Box>
          </Stack>
        </div>
      ))}
    </FormWrap>
  );
};

export default FormJobs;
