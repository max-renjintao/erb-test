import ScrollDialog from 'renderer/layouts/dialog';
import useWork from 'renderer/store/useWork';
import { useEffect, useState } from 'react';
import useApp from 'renderer/store/useApp';
import DocHeader from '../components/doc/Header';
import DocVehicle from '../components/doc/Vehicle';
import DocNeeds from '../components/doc/Needs';
import DocPaid from '../components/doc/Paid';
import DocNotice from '../components/doc/Notice';
import DocBill from '../components/doc/Bill';
import DocItemList from '../components/doc/ItemList';
import DocFooter from '../components/doc/DocFooter';
import '../invoice.scss';

const DialogWork = ({ id }: { id: number }) => {
  console.log('% <DialogWork> ...');
  const {
    app: { workOps: options },
  } = useApp();
  const { work, imWork, update, remove, isEdited } = useWork(id);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(id > -1);
  }, [id]);
  if (!work) return <>no work</>;

  const onClose = () => {
    // imApp((a) => {
    //   a.showDialogWorkEdit = false;
    // });
    setOpen(false);
  };
  // const onUpdate = () => {
  //   update();
  // };
  // const onDelete = () => {
  //   remove();
  //   onClose();
  // };

  return (
    <ScrollDialog open={open}>
      {/* <WorkEditInfo
        immer={[work, imWork]}
        onDel={onDelete}
        onUpdate={onUpdate}
        onClose={onClose}
        isEdited={isEdited}
      /> */}
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
            {work.status === 5 && (
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
