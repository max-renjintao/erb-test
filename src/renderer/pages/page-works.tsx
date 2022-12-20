import { Button, Dialog } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useWorks from 'renderer/store/useWorks';
import WorkEditInfo from 'renderer/components/workEdit/workEditInfo';
import WorksTable from '../components/WorksTable';
import ScrollDialog from '../layouts/dialog';
import Invoice from '../components/workEdit/Invoice';

const WorksPage = () => {
  // const navigate = useNavigate();
  // const { works, insert } = useWorks();
  // const [id, setId] = useState(0);
  const { app, append } = useWorks();
  return (
    <>
      <WorksTable />
      <ScrollDialog open={app.showDialogWorkEdit}>
        <WorkEditInfo />
        <Invoice />
      </ScrollDialog>

      <Button onClick={() => append()}>Append</Button>
    </>
  );
};
export default WorksPage;
