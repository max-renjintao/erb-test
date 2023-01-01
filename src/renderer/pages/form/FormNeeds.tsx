/* eslint-disable react/no-array-index-key */
import { Add } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import InAuto from 'renderer/components/inputs/InAuto';
import InImText from 'renderer/components/inputs/InImText';
import { ImmerHook } from 'use-immer';

const FormNeeds = ({
  im,
  options,
}: {
  im: ImmerHook<Work>;
  options: WorkOptions;
}) => {
  const [work, imWork] = im;
  return (
    <Stack spacing={0.5}>
      <small style={{ padding: '1px 4px', backgroundColor: '#ccc' }}>
        Repair Requirements 故障现象/送修要求
      </small>
      {work.needs.map((need, i) => (
        <InAuto
          key={i}
          label={i + 1}
          pl="20px"
          options={options.needs}
          multiline
          value={need}
          onEdit={(v) =>
            imWork((w) => {
              w.needs[i] = v;
            })
          }
        />
      ))}
      <Button
        startIcon={<Add />}
        size="small"
        onClick={() =>
          imWork((w) => {
            w.needs.push('');
          })
        }
      >
        Append a Requirement
      </Button>
      {/* <InImAuto immer={[[work, imWork], 'needs']} /> */}
    </Stack>
  );
};

export default FormNeeds;
