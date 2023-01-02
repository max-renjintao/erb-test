import DocVehicle from 'renderer/pages/doc/DocVehicle';
import DocNeeds from 'renderer/pages/doc/DocNeeds';
import DocJobsAndMats from 'renderer/pages/doc/DocJobsAndMats';
import DocBill from 'renderer/pages/doc/DocBill';
import DocNotice from 'renderer/pages/doc/DocNotice';
import DocHeader from 'renderer/pages/doc/DocHeader';
import DocFooter from 'renderer/pages/doc/DocFooter';
import { Stack } from '@mui/material';
import { ImmerHook } from 'use-immer';
import DocPaid from 'renderer/components/doc/DocPaid';

const Doc = ({
  im,
  options,
}: {
  im: ImmerHook<Work>;
  options: WorkOptions;
}) => {
  const [work] = im;
  return (
    <div className="doc-paper">
      <DocHeader work={work} />
      <DocVehicle imm={im} options={options} />
      <DocNeeds imm={im} options={options} />
      {work.status >= 3 && <DocJobsAndMats imm={im} options={options} />}
      <Stack pt={1} direction="row" height={230} justifyContent="space-between">
        {work.status === 5 && <DocPaid />}
        <DocNotice immer={im} style={{ width: '65%' }} />
        <DocBill imm={im} style={{ width: '33%' }} />
      </Stack>
      <DocFooter />
    </div>
  );
};

export default Doc;
