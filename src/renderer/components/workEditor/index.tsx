import useWork from 'renderer/store/useWork';
import { ButtonSide } from 'renderer/components/inputs/Buttons';
import EastIcon from '@mui/icons-material/East';
import InvoiceFooter from './print/Footer';
import InvoiceNotice from './print/Notice';
import InvoiceBill from './print/Bill';
import InvoiceVehicle from './print/Vehicle';
import InvoiceNeeds from './print/Needs';
import InvoiceItemList from './print/ItemList';
import InvoiceHeader from './print/Header';
import InvoicePaid from './print/Paid';

const WorkEditor = () => {
  const { work, insertNeed: insertOrder } = useWork();

  if (!work) return <>!!! no work</>;

  return (
    <div className="invoice-paper">
      <InvoiceHeader />
      <InvoiceVehicle />
      <InvoiceNeeds />
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
export default WorkEditor;
