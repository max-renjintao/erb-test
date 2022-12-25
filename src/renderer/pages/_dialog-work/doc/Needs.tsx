/* eslint-disable react/no-array-index-key */
import InvoiceTable, {
  InvoiceTH as Th,
  InvoiceCell as Td,
} from 'renderer/components/InvoiceTable';
import useWork from 'renderer/store/useWork';
import EastIcon from '@mui/icons-material/East';
import CloseIcon from '@mui/icons-material/Close';
// import { WorkImmerProps } from 'renderer/tulando-app';
import { ButtonSide } from 'renderer/components/inputs/Buttons';
import { jobInit } from 'renderer/store/constants';
import InvoiceInput from 'renderer/components/inputs/InvoiceInput';
// import { ButtonSide } from '../../inputs/Buttons';
// import InvoiceInput from '../../inputs/InvoiceInput';

type P = WorkImmerProps & { options: WorkOptions };
const DocNeeds = ({ immer: [work, imWork], options }: P) => {
  // const { work, insertNeed, app, imWork, deleteNeed } = useWork();
  return (
    <InvoiceTable heading="Fault Phenomenon/Repair Requirements 故障现象/送修要求">
      {work.needs.map((item, i) => (
        <tr key={i}>
          <Td width="4%">
            <ButtonSide // order / insert button
              left={18}
              mt={-40}
              onClick={() =>
                imWork((w) => {
                  w.needs.splice(i, 0, '');
                })
              }
            >
              <EastIcon />
            </ButtonSide>
            {i + 1}
          </Td>
          <InvoiceInput // order
            multiline
            textAlign="left"
            options={options.needs}
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
              onClick={() =>
                imWork((w) => {
                  w.needs.splice(i, 1);
                })
              }
            >
              <CloseIcon />
            </ButtonSide>
          </InvoiceInput>
        </tr>
      ))}
    </InvoiceTable>
  );
};

export default DocNeeds;
