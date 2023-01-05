import { Stack } from '@mui/material';
import InImText from 'renderer/components/inputs/InImText';

const FormNote = ({ imm }: { imm: ImmWork }) => {
  return (
    <Stack direction="row">
      <InImText
        disabled={imm[0]?.status === 5}
        immer={[imm, 'note']}
        multiline
        pl="50px"
      />
    </Stack>
  );
};

export default FormNote;
