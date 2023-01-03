import { Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import FormWrap from 'renderer/components/Form/FormWrap';
import InAuto from 'renderer/components/inputs/InAuto';
import InImAuto from 'renderer/components/inputs/InImAuto';
import InImDate from 'renderer/components/inputs/InImDate';
import InImText from 'renderer/components/inputs/InImText';
import { ImmerHook } from 'use-immer';

const FormVehicle = ({
  im,
  options,
}: {
  im: ImmerHook<Work>;
  options: WorkOptions;
}) => {
  return (
    <FormWrap title="Vehicle Information">
      <Grid xs={4}>
        <InImText immer={[im, 'sn']} />
      </Grid>
      {/* <Grid xs={4}>
        <InImAuto immer={[im, 'status']} options={options.status} />
      </Grid> */}
      <Grid xs={4}>
        <InImDate immer={[im, 'date_s']} />
      </Grid>
      <Grid xs={4}>
        <InImDate immer={[im, 'date_e']} />
      </Grid>
      <Grid xs={4}>
        <InImAuto
          immer={[im, 'plate']}
          options={options.vehicles.map((v) => v.plate)}
        />
      </Grid>
      <Grid xs={4}>
        {/* <InImAuto immer={[im, 'model']} options={options.models} /> */}
      </Grid>
      <Grid xs={4}>
        <InImText immer={[im, 'mileage']} endAdornment={<small>/km</small>} />
      </Grid>
      <Grid xs={4}>
        <InImText immer={[im, 'owner']} />
      </Grid>
      <Grid xs={4}>
        <InImText immer={[im, 'tel']} />
      </Grid>
      <Grid xs={4}>
        <InImText immer={[im, 'vip']} />
      </Grid>
    </FormWrap>
  );
};

export default FormVehicle;
