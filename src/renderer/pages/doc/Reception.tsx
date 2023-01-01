import DocVehicle from 'renderer/components/doc/Vehicle';
import DocNeeds from 'renderer/components/doc/Needs';
import DocItemList from 'renderer/components/doc/ItemList';
import DocBill from 'renderer/components/doc/Bill';
import DocNotice from 'renderer/components/doc/Notice';
import DocHeader from 'renderer/components/doc/Header';
import DocFooter from 'renderer/components/doc/DocFooter';
import { Stack } from '@mui/material';
import { ImmerHook } from 'use-immer';

const Reception = ({
  im,
  options,
}: {
  im: ImmerHook<Work>;
  options: WorkOptions;
}) => {
  const [work] = im;
  return (
    <div className="doc">
      <DocHeader work={work} />
      <DocVehicle immer={im} options={options} />
      <DocNeeds immer={im} options={options} />
      <DocItemList immer={im} options={options} />
      {/* <FormNeeds im={im} options={options} />
  <FormJobs im={im} options={options} /> */}
      <Stack pt={1} direction="row" height={230} justifyContent="space-between">
        <DocNotice immer={im} style={{ width: '65%' }} />
        <DocBill immer={im} style={{ width: '33%' }} />
      </Stack>
      <DocFooter />
    </div>
  );
};

export default Reception;
