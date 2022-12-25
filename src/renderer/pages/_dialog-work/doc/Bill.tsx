/* eslint-disable no-nested-ternary */
import numeral from 'numeral';
import InvoiceInput from 'renderer/components/inputs/InvoiceInput';
import InvoiceTable, {
  InvoiceTH as Th,
  InvoiceCell as Td,
} from 'renderer/components/InvoiceTable';
import useWork from 'renderer/store/useWork';
import { amount, percent } from 'utils/disp';
// import InvoiceInput from '../../inputs/InvoiceInput';

const DocBill = ({ immer: [work, imWork] }: WorkImmerProps) => {
  // const { work, imWork } = useWork();
  return (
    <InvoiceTable
      heading="Total Amount and Details 费用统计"
      style={{ height: 230, textAlign: 'right' }}
    >
      <tr>
        <Td justifyContent="end">Labor Cost 人工费</Td>
        <Td width={80} justifyContent="end">
          {work.labor}
        </Td>
      </tr>
      <tr>
        <Td justifyContent="end">Parts and Materials 材料费</Td>
        <Td justifyContent="end">{work.material}</Td>
      </tr>
      <tr>
        <Td justifyContent="end">Sub-Total 小计</Td>
        <Td justifyContent="end">{amount(work.sub_total)}</Td>
      </tr>
      <tr>
        <Td justifyContent="end">Tax</Td>

        <InvoiceInput // tax
          options={[]}
          textAlign="right"
          value={percent(work.tax)}
          onEdit={(v) =>
            imWork((d) => {
              d.tax = numeral(v).value() || 0;
            })
          }
        />
      </tr>

      <tr>
        <Td justifyContent="end">
          {work.discount < 0
            ? 'Discount'
            : work.discount > 0
            ? 'Addition'
            : '-'}
        </Td>
        <InvoiceInput // discount
          options={[]}
          textAlign="right"
          value={amount(work.discount)}
          onEdit={(v) =>
            imWork((w) => {
              w.discount = numeral(v).value() || 0;
            })
          }
        />
      </tr>
      <tr>
        <Td justifyContent="end">Total Amount</Td>
        <Td justifyContent="end">
          <strong>{amount(work.total)}</strong>
        </Td>
      </tr>
    </InvoiceTable>
  );
};

export default DocBill;
