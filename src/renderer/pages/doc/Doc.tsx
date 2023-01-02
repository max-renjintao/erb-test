import DocVehicle from 'renderer/pages/doc/DocVehicle';
import DocNeeds from 'renderer/pages/doc/DocNeeds';
import DocJobsAndMats from 'renderer/pages/doc/DocJobsAndMats';
import DocBill from 'renderer/pages/doc/DocBill';
import DocNotice from 'renderer/pages/doc/DocNotice';
import DocHeader from 'renderer/pages/doc/DocHeader';
import DocFooter from 'renderer/pages/doc/DocFooter';
import DocPaid from 'renderer/components/doc/DocPaid';
import { Stack } from '@mui/material';

const Doc = ({ imm, options }: { imm: ImmWork; options: Options }) => {
  const [work] = imm;
  return (
    <div className="doc-paper">
      <DocHeader work={work} />
      <DocVehicle imm={imm} options={options} />
      <DocNeeds imm={imm} options={options} />
      {work.status >= 3 && <DocJobsAndMats imm={imm} options={options} />}
      <Stack pt={1} direction="row" height={230} justifyContent="space-between">
        {work.status === 5 && <DocPaid />}
        <DocNotice immer={imm} style={{ width: '65%' }} />
        <DocBill imm={imm} style={{ width: '33%' }} />
      </Stack>
      <DocFooter />
    </div>
  );
};

export default Doc;
