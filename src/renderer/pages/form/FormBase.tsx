import { Stack } from '@mui/material';
import InImDate from 'renderer/components/inputs/InImDate';
import InImNum from 'renderer/components/inputs/InImNum';

const FormBase = ({ imm }: { imm: ImmWork }) => {
  return (
    <Stack direction="row" spacing={1}>
      <InImNum immer={[imm, 'sn']} pl="30px" sx={{ width: 110 }} />
      <InImDate immer={[imm, 'date_s']} pl="60px" sx={{ width: 180 }} />
      <InImDate immer={[imm, 'date_e']} pl="60px" sx={{ width: 180 }} />
      <InImNum immer={[imm, 'team']} pl="40px" sx={{ width: 70 }} />
      <InImNum immer={[imm, 'status']} pl="50px" sx={{ width: 80 }} />
    </Stack>
  );
};

export default FormBase;
