import useWork from 'renderer/store/useWork';
import { ButtonSide } from 'renderer/components/Buttons';
import EastIcon from '@mui/icons-material/East';
import InvoiceFooter from './InvoiceFooter';
import InvoiceNotice from './InvoiceNotice';
import InvoiceBill from './InvoiceBill';
import InvoiceInfo from './InvoiceInfo';
import InvoiceOrders from './InvoiceOrders';
import InvoiceItemList from './InvoiceItemList';
import InvoiceHeader from './InvoiceHeader';
import InvoicePaid from './InvoicePaid';

const Invoice = () => {
  const { work, insertOrder } = useWork();

  if (!work) return <>!!! no work</>;

  return (
    <div className="invoice-paper">
      <InvoiceHeader />
      <InvoiceInfo />
      <InvoiceOrders />
      <ButtonSide // order / append button
        left={18}
        mt={-15}
        onClick={() => {
          insertOrder(999);
        }}
      >
        <EastIcon />
      </ButtonSide>
      <InvoiceItemList />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <div style={{ position: 'relative', width: 520, paddingRight: 30 }}>
          <InvoiceNotice />
          {work.status.toLowerCase() === 'paid' && (
            <div
              style={{
                position: 'absolute',
                right: -200,
                marginTop: -150,
                transform: 'rotate(-30deg)',
              }}
            >
              <InvoicePaid />
            </div>
          )}
        </div>
        <div style={{ width: 260 }}>
          <InvoiceBill />
        </div>
      </div>
      <InvoiceFooter />
    </div>
  );
};
export default Invoice;
