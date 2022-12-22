/* eslint-disable react/no-array-index-key */
import InvoiceTable, {
  InvoiceTH as Th,
  InvoiceCell as Td,
} from 'renderer/components/InvoiceTable';
import useWork from 'renderer/store/useWork';
import EastIcon from '@mui/icons-material/East';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonSide } from '../../inputs/Buttons';
import InvoiceInput from '../../inputs/InvoiceInput';

const InvoiceNeeds = () => {
  const { work, insertNeed, app, imWork, deleteNeed } = useWork();
  return (
    <InvoiceTable heading="Fault Phenomenon/Repair Requirements 故障现象/送修要求">
      {work.needs.map((item, i) => (
        <tr key={i}>
          <Td width="4%">
            <ButtonSide // order / insert button
              left={18}
              mt={-40}
              onClick={() => {
                insertNeed(i);
              }}
            >
              <EastIcon />
            </ButtonSide>
            {i + 1}
          </Td>
          <InvoiceInput // order
            multiline
            textAlign="left"
            options={app.workOps.needs}
            value={`${work.needs[i]}`}
            onEdit={(v) => {
              imWork((draft) => {
                draft.needs[i] = v;
              });
            }}
          >
            <ButtonSide // order delete button
              right={1}
              mt={10}
              onClick={() => deleteNeed(i)}
            >
              <CloseIcon />
            </ButtonSide>
          </InvoiceInput>
        </tr>
      ))}
    </InvoiceTable>
  );
};

export default InvoiceNeeds;
