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
  const { id, works, append: insert } = useWorks();
  return (
    <>
      <WorksTable />
      <ScrollDialog open={id > 0}>
        <WorkEditInfo />
        <Invoice />
      </ScrollDialog>

      <Button onClick={() => insert()}>Append</Button>
    </>
  );
};
export default WorksPage;
