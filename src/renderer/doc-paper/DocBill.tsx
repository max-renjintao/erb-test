/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import numeral from 'numeral';
import DocTable, { DocTableProps } from 'renderer/components/doc/DocTable';
import { amount, percent } from 'utils/disp';
import Discount from '@mui/icons-material/Discount';
import Balance from '@mui/icons-material/Balance';

import Td from 'renderer/components/doc/DocTableTd';
import { LocalAtm } from '@mui/icons-material';
import IconBtnFly from 'renderer/components/doc/DocIconBtnFly';

import DocInNum from 'renderer/components/doc/DocInNum';

type P = DocProps & DocTableProps;
const DocBill = ({ imm: [work, imWork], disabled, ...ps }: P) => {
  return (
    <DocTable heading="Total Amount and Details 费用统计" {...ps}>
      <tr>
        <Td right style={{ borderTop: 0, borderBottom: 0 }}>
          Labor Cost 人工费
        </Td>
        <Td width={80} right>
          {amount(work.labor)}
        </Td>
      </tr>
      <tr>
        <Td right style={{ borderTop: 0, borderBottom: 0 }}>
          Parts and Materials 材料费
        </Td>
        <Td right>{amount(work.material)}</Td>
      </tr>
      <tr>
        <Td right style={{ borderTop: 0, borderBottom: 0 }}>
          Sub-Total 小计
        </Td>
        <Td right>{amount(work.sub_total)}</Td>
      </tr>

      <tr>
        <Td right style={{ borderTop: 0, borderBottom: 0 }}>
          Tax 税费
          {disabled || (
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
          )}
        </Td>
        <td>
          <DocInNum // tax
            disabled={disabled}
            format="0,0 %"
            value={work.tax}
            textAlign="right"
            onEdit={(v) =>
              imWork((d) => {
                d.tax = v;
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
              disabled={disabled}
              format="0,0.00"
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
          {disabled || (
            <>
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
            </>
          )}
        </Td>
        <Td right>
          <strong>
            {work.docOptions[1] || work.tax || work.discount
              ? amount(work.total)
              : '-'}
          </strong>
        </Td>
      </tr>
    </DocTable>
  );
};

export default DocBill;
