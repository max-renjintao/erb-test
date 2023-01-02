/* eslint-disable no-nested-ternary */
import numeral from 'numeral';
import InText from 'renderer/components/inputs/InText';
import DocTable, { DocTableProps } from 'renderer/components/doc/DocTable';
import { amount, percent } from 'utils/disp';
import { ComponentProps } from 'react';
import Td from '../../components/doc/DocTableTd';
// import InvoiceInput from '../../inputs/InvoiceInput';

const DocBill = ({
  imm: [work, imWork],
  ...props
}: WorkImmerProps & DocTableProps) => {
  // const { work, imWork } = useWork();
  return (
    <DocTable
      heading="Total Amount and Details 费用统计"
      // style={{ height: 230, textAlign: 'right' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
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
        <Td right>{amount(work.sub_total)}</Td>
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
