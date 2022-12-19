/* eslint-disable react/no-array-index-key */
import InvoiceTable, {
  InvoiceTH as Th,
  InvoiceCell as Td,
} from 'renderer/components/InvoiceTable';
import useWork from 'renderer/store/useWork';
import EastIcon from '@mui/icons-material/East';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonSide } from '../Buttons';
import InvoiceInput from '../InvoiceInput';

const InvoiceOrders = () => {
  const { work, insertOrder, orders, setWorkImmer, deleteOrder } = useWork();
  return (
    <InvoiceTable heading="Fault Phenomenon/Repair Requirements 故障现象/送修要求">
      {work.orders.map((item, i) => (
        <tr key={i}>
          <Td width="4%">
            <ButtonSide // order / insert button
              left={18}
              mt={-40}
              onClick={() => {
                insertOrder(i);
              }}
            >
              <EastIcon />
            </ButtonSide>
            {i + 1}
          </Td>
          <InvoiceInput // order
            textAlign="left"
            options={orders}
            value={`${work.orders[i]}`}
            onEdit={(v) => {
              setWorkImmer((draft) => {
                draft.orders[i] = v;
              });
            }}
          >
            <ButtonSide // order delete button
              right={1}
              mt={10}
              onClick={() => deleteOrder(i)}
            >
              <CloseIcon />
            </ButtonSide>
          </InvoiceInput>
        </tr>
      ))}
    </InvoiceTable>
  );
};

export default InvoiceOrders;
