import { Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useWorks from 'renderer/store/useWorks';
import WorksTable from '../components/WorksTable';
import ScrollDialog from '../layouts/dialog';
import WorkEdit from '../components/workEdit';

const WorksPage = () => {
  // const navigate = useNavigate();
  const { works, update, remove, insert } = useWorks();
  const [id, setId] = useState(0);
  return (
    <>
      <WorksTable data={works} onEdit={(i) => setId(i)} />
      <ScrollDialog open={id > 0} onClose={() => setId(0)}>
        <WorkEdit
          id={id}
          onClose={() => setId(0)}
          onSave={update}
          onDelete={() => remove(id)}
        />
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
