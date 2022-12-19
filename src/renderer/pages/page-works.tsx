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
  const { id, works, insert } = useWorks();
  return (
    <>
      <WorksTable />
      <ScrollDialog open={id > 0}>
        <WorkEditInfo />
        <Invoice />
      </ScrollDialog>

      <Button onClick={() => insert(works.length + 1)}>Append</Button>
      <Link to="/work/1">/work/1</Link>
      <Button
        onClick={() => window.electron.ipcRenderer.sendMessage('print', [])}
      >
        Print
      </Button>
    </>
  );
};
export default WorksPage;
