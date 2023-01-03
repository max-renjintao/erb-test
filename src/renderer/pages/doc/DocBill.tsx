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
import DocInText from 'renderer/components/inputs/DocInText';
import DocInNum from 'renderer/components/inputs/DocInNum';
import IconBtnFly from 'renderer/components/menu/IconBtnFly';
import { LocalAtm } from '@mui/icons-material';

type P = { imm: ImmWork } & DocTableProps;
const DocBill = ({ imm: [work, imWork], ...ps }: P) => {
  return (
    <DocTable heading="Total Amount and Details 费用统计" {...ps}>
      <tr>
        <Td right style={{ borderTop: 0, borderBottom: 0 }}>
          Labor Cost 人工费
        </Td>
        <Td width={80} right>
          {work.labor}
        </Td>
      </tr>
      <tr>
        <Td right style={{ borderTop: 0, borderBottom: 0 }}>
          Parts and Materials 材料费
        </Td>
        <Td right>{work.material}</Td>
      </tr>
      <tr>
        <Td right style={{ borderTop: 0, borderBottom: 0 }}>
          Sub-Total 小计
        </Td>
        <Td right>{amount(work.sub_total, '0,0')}</Td>
      </tr>

      <tr>
        <Td right style={{ borderTop: 0, borderBottom: 0 }}>
          Tax 税费
          <IconBtnFly
            sx={{ right: -30 }}
            color={!work.tax ? 'default' : 'primary'}
            MuiIcon={Balance}
            onClick={() =>
              imWork((w) => {
                w.tax = work.tax !== 0.16 ? 0.16 : 0;
              })
            }
          />
        </Td>
        <td>
          <DocInText // tax
            value={work.tax ? percent(work.tax) : '-'}
            textAlign="right"
            onChange={(e) =>
              imWork((d) => {
                d.tax = numeral(e.target.value).value() || 0;
              })
            }
          />
        </td>
      </tr>

      {(work.docOptions[2] || work.discount !== 0) && (
        <tr>
          <Td right style={{ borderTop: 0, borderBottom: 0 }}>
            Discount
          </Td>
          <td>
            <DocInNum // discount
              value={work.discount}
              onEdit={(v) =>
                imWork((w) => {
                  w.discount = v;
                })
              }
            />
          </td>
        </tr>
      )}
      <tr>
        <Td right style={{ borderTop: 0 }}>
          Total Amount 总额
          <IconBtnFly
            sx={{ right: -30, mt: -2 }}
            color={!work.docOptions[2] ? 'default' : 'primary'}
            MuiIcon={Discount}
            onClick={() =>
              imWork((w) => {
                w.docOptions[2] = work.docOptions[2] ? 0 : 1;
              })
            }
          />
          <IconBtnFly
            sx={{ right: -30, mt: 5 }}
            color={!work.docOptions[1] ? 'default' : 'primary'}
            MuiIcon={LocalAtm}
            onClick={() =>
              imWork((w) => {
                w.docOptions[1] = work.docOptions[1] ? 0 : 1;
              })
            }
          />
        </Td>
        <Td right>
          <strong>
            {work.docOptions[1] || work.tax || work.discount
              ? amount(work.total, '0,0')
              : '-'}
          </strong>
        </Td>
      </tr>
    </DocTable>
  );
};

export default DocBill;
