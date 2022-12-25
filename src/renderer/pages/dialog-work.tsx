import ScrollDialog from 'renderer/layouts/dialog';
import useWork from 'renderer/store/useWork';
import { useImmer } from 'use-immer';
import useWorks from 'renderer/store/useWorks';
import EastIcon from '@mui/icons-material/East';
import { Button } from '@mui/material';
import { ButtonSide } from 'renderer/components/inputs/Buttons';
import DocHeader from './_dialog-work/doc/Header';
import WorkEditInfo from './_dialog-work/workEditInfo';
import DocVehicle from './_dialog-work/doc/Vehicle';
import DocNeeds from './_dialog-work/doc/Needs';
import DocPaid from './_dialog-work/doc/Paid';
import DocNotice from './_dialog-work/doc/Notice';
import DocBill from './_dialog-work/doc/Bill';
import DocItemList from './_dialog-work/doc/ItemList';
import DocFooter from './_dialog-work/doc/Footer';
import '../invoice.scss';

const DialogWork = () => {
  console.log('% <DialogWork> ...');
  const { works, app, imApp, options } = useWorks();
  const { work, imWork, update, remove } = useWork(app.index);

  const onClose = () => {
    imApp((a) => {
      a.showDialogWorkEdit = false;
    });
  };
  const onUpdate = () => {
    update();
  };
  const onDelete = () => {
    remove();
    onClose();
  };
  if (!work) return <>no work</>;
  return (
    <ScrollDialog open={app.showDialogWorkEdit}>
      <WorkEditInfo
        immer={[work, imWork]}
        onDel={onDelete}
        onUpdate={onUpdate}
        onClose={onClose}
        isEdited={app.isEdited}
      />
      <div className="invoice-paper">
        <DocHeader work={work} />
        <DocVehicle immer={[work, imWork]} options={options} />
        <DocNeeds immer={[work, imWork]} options={options} />

        <DocItemList immer={[work, imWork]} options={options} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <div style={{ position: 'relative', width: 520, paddingRight: 30 }}>
            <DocNotice immer={[work, imWork]} />
            {work.status.toLowerCase() === 'paid' && (
              <div
                style={{
                  position: 'absolute',
                  right: -200,
                  marginTop: -150,
                  transform: 'rotate(-30deg)',
                }}
              >
                <DocPaid />
              </div>
            )}
          </div>
          <div style={{ width: 260 }}>
            <DocBill immer={[work, imWork]} />
          </div>
        </div>
        <DocFooter />
      </div>
    </ScrollDialog>
  );
};

export default DialogWork;
