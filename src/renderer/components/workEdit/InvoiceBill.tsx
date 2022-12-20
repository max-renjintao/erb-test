import numeral from 'numeral';
import InvoiceTable, {
  InvoiceTH as Th,
  InvoiceCell as Td,
} from 'renderer/components/InvoiceTable';
import useWork from 'renderer/store/useWork';
import { amount, percent } from 'utils/disp';
import InvoiceInput from '../InvoiceInput';

const InvoiceBill = () => {
  const { work, sumJobs, sumMats, subTotal, totalAmount, imWork } = useWork();
  return (
    <InvoiceTable
      heading="Total Amount and Details 费用统计"
      style={{ height: 230, textAlign: 'right' }}
    >
      <tr>
        <Td justifyContent="end">Labor Cost 人工费</Td>
        <Td width={80} justifyContent="end">
          {sumJobs}
        </Td>
      </tr>
      <tr>
        <Td justifyContent="end">Parts and Materials 材料费</Td>
        <Td justifyContent="end">{sumMats}</Td>
      </tr>
      <tr>
        <Td justifyContent="end">Sub-Total 小计</Td>
        <Td justifyContent="end">{amount(subTotal)}</Td>
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
        <Td justifyContent="end">Discount</Td>
        <InvoiceInput // discount
          options={[]}
          textAlign="right"
          value={amount(work.discount)}
          onEdit={(v) =>
            imWork((d) => {
              d.discount = numeral(v).value() || 0;
            })
          }
        />
      </tr>
      <tr>
        <Td justifyContent="end">Total Amount</Td>
        <Td justifyContent="end">
          <strong>{amount(totalAmount)}</strong>
        </Td>
      </tr>
    </InvoiceTable>
  );
};

export default InvoiceBill;
