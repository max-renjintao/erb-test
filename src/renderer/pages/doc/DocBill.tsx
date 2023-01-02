/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import numeral from 'numeral';
import InText from 'renderer/components/inputs/InText';
import DocTable, { DocTableProps } from 'renderer/components/doc/DocTable';
import { amount, percent } from 'utils/disp';
import IconBtn from 'renderer/components/menu/IconBtn';
import Discount from '@mui/icons-material/Discount';
import Balance from '@mui/icons-material/Balance';

import { Stack } from '@mui/material';
import Td from 'renderer/components/doc/DocTableTd';
import MenuBar from 'renderer/components/menu/MenuBar';

type P = { imm: ImmWork } & DocTableProps;
const DocBill = ({ imm: [work, imWork], ...ps }: P) => {
  return (
    <DocTable heading="Total Amount and Details 费用统计" {...ps}>
      <tr>
        <Td right>Labor Cost 人工费</Td>
        <Td width={80} right>
          {work.labor}
        </Td>
      </tr>
      <tr>
        <Td right>Parts and Materials 材料费</Td>
        <Td right>{work.material}</Td>
      </tr>
      <tr>
        <Td right>Sub-Total 小计</Td>
        <Td right>
          {amount(work.sub_total)}
          <MenuBar sx={{ right: -30 }}>
            <Stack>
              <IconBtn MuiIcon={Balance} />
              <IconBtn MuiIcon={Discount} />
            </Stack>
          </MenuBar>
        </Td>
      </tr>
      <tr>
        <Td right>Tax</Td>
        <td>
          <InText // tax
            variant="outlined"
            value={percent(work.tax)}
            inputProps={{
              style: {
                textAlign: 'right',
                height: '10px',
              },
            }}
            onChange={(e) =>
              imWork((d) => {
                d.tax = numeral(e.target.value).value() || 0;
              })
            }
          />
        </td>
        {/* <InvoiceInput // tax
          options={[]}
          textAlign="right"
          value={percent(work.tax)}
          onEdit={(v) =>
            imWork((d) => {
              d.tax = numeral(v).value() || 0;
            })
          }
        /> */}
      </tr>

      <tr>
        <Td right>
          {work.discount < 0
            ? 'Discount'
            : work.discount > 0
            ? 'Addition'
            : '-'}
        </Td>
        {/* <InvoiceInput
          options={[]}
          textAlign="right"
          value={amount(work.discount)}
          onEdit={(v) =>
            imWork((w) => {
              w.discount = numeral(v).value() || 0;
            })
          }
        /> */}
        <td>
          <InText // discount
            variant="outlined"
            value={amount(work.discount)}
            inputProps={{
              style: {
                textAlign: 'right',
                height: '10px',
              },
            }}
            onChange={(e) =>
              imWork((w) => {
                w.discount = numeral(e.target.value).value() || 0;
              })
            }
          />
        </td>
      </tr>
      <tr>
        <Td right>Total Amount</Td>
        <Td right>
          <strong>{amount(work.total)}</strong>
        </Td>
      </tr>
    </DocTable>
  );
};

export default DocBill;
