import { Button } from '@mui/material';
import useWorks from 'renderer/store/useWorks';
import WorksTable from './_page-works/WorksTable';
import DialogWork from './dialog-work';

const WorksPage = () => {
  console.log('<WorksPage>');
  const { works, app, append, imApp } = useWorks();

  return (
    <>
      <WorksTable
        rows={works}
        onEdit={(id) => {
          imApp((a) => {
            a.showDialogWorkEdit = true;
            a.index = works.findIndex((f) => f.id === id);
          });
        }}
      />

      <DialogWork />
      <Button onClick={() => append()}>Append</Button>
      {app.csvFilePath}
    </>
  );
};
export default WorksPage;
