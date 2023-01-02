/* eslint-disable react/no-array-index-key */
import DocTable from 'renderer/components/doc/DocTable';
import DocInAuto from 'renderer/components/inputs/DocInAuto';
import {
  Add,
  Delete,
  North,
  NorthEast,
  South,
  SouthEast,
} from '@mui/icons-material';
import Td from '../../components/doc/DocTableTd';
import MenuEditJob from '../menu/MenuEditJob';
import IconButtonSmall from '../menu/IconButtonSmall';
// import { ButtonSide } from '../../inputs/Buttons';
// import InvoiceInput from '../../inputs/InvoiceInput';

type P = WorkImmerProps & { options: WorkOptions };
const DocNeeds = ({ imm: [work, imWork], options }: P) => {
  // const { work, insertNeed, app, imWork, deleteNeed } = useWork();
  return (
    <div style={{ position: 'relative' }}>
      <DocTable
        noBorderTop
        heading="Fault Phenomenon/Repair Requirements 故障现象/送修要求"
      >
        {work.needs.map((item, i) => (
          <tr key={i}>
            <Td width="4%">
              <MenuEditJob sx={{ left: -30 }}>
                <IconButtonSmall
                  color="error"
                  MuiIcon={Delete}
                  onClick={() =>
                    imWork((w) => {
                      w.needs.splice(i, 1);
                    })
                  }
                />
                <IconButtonSmall
                  MuiIcon={North}
                  disabled={i <= 0}
                  onClick={() =>
                    imWork((w) => {
                      w.needs.splice(i - 1, 0, w.needs.splice(i, 1)[0]);
                    })
                  }
                />
                <IconButtonSmall
                  MuiIcon={South}
                  disabled={i >= work.needs.length - 1}
                  onClick={() =>
                    imWork((w) => {
                      w.needs.splice(i + 1, 0, w.needs.splice(i, 1)[0]);
                    })
                  }
                />
                <IconButtonSmall
                  MuiIcon={NorthEast}
                  onClick={() =>
                    imWork((w) => {
                      w.needs.splice(i, 0, '');
                    })
                  }
                />
                <IconButtonSmall
                  MuiIcon={SouthEast}
                  onClick={() =>
                    imWork((w) => {
                      w.needs.splice(i + 1, 0, '');
                    })
                  }
                />
              </MenuEditJob>
              {i + 1}
            </Td>
            <DocInAuto // order
              multiline
              textAlign="left"
              options={options.needs}
              value={`${work.needs[i]}`}
              onEdit={(v) => {
                imWork((draft) => {
                  draft.needs[i] = v;
                });
              }}
            />
          </tr>
        ))}
      </DocTable>
      <span style={{ position: 'absolute', left: -30 }}>
        <IconButtonSmall
          MuiIcon={Add}
          onClick={() =>
            imWork((w) => {
              w.needs.push('');
            })
          }
        />
      </span>
    </div>
  );
};

export default DocNeeds;
