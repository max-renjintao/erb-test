import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AddIcon from '@mui/icons-material/DirectionsCar';
import JobIcon from '@mui/icons-material/CarRepair';
import BillIcon from '@mui/icons-material/CarCrash';
import HomeIcon from '@mui/icons-material/Newspaper';
import WorksIcon from '@mui/icons-material/Commute';
import TeamsIcon from '@mui/icons-material/People';
import MaterialIcon from '@mui/icons-material/Warehouse';
import FinanceIcon from '@mui/icons-material/Paid';
import WaitIcon from '@mui/icons-material/SupportAgent';
import { useEffect } from 'react';
import Layout from './pages/layout';
import PageHome from './pages/page-100-home';
// import WorkInvoice from './pages/page-work-invoice';
import PageTeams from './pages/page-100-teams';
import PageMaterial from './pages/page-100-material';
import PageLogin from './pages/page-0-login';
import PageWorksEdit from './pages/page-works-edit';

export default function App() {
  console.log('<App>');
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('full-screen', [true]);
  }, []);
  return (
    <Router>
      <Layout
        links={[
          { icon: <WaitIcon />, path: '/wait', authority: 1 },
          { icon: <AddIcon />, path: '/new', authority: 2 },
          { icon: <JobIcon />, path: '/job', authority: 3 },
          { icon: <BillIcon />, path: '/bill', authority: 4 },
          { icon: <WorksIcon />, path: '/works', authority: 5 },
          { icon: <HomeIcon />, path: '/home', authority: 5 },
          { icon: <TeamsIcon />, path: '/teams', authority: 5 },
          { icon: <MaterialIcon />, path: '/material', authority: 5 },
          { icon: <FinanceIcon />, path: '/finance', authority: 5 },
        ]}
      >
        <Routes>
          <Route path="/" element={<PageLogin />} />
          <Route path="/wait" element={<PageWorksEdit pageStatus={1} />} />
          <Route path="/new" element={<PageWorksEdit pageStatus={2} />} />
          <Route path="/job" element={<PageWorksEdit pageStatus={3} />} />
          <Route path="/bill" element={<PageWorksEdit pageStatus={4} />} />
          <Route path="/works" element={<PageWorksEdit pageStatus={5} />} />
          <Route path="/home" element={<PageHome />} />
          <Route path="/teams" element={<PageTeams />} />
          <Route path="/material" element={<PageMaterial />} />
          {/* <Route path="/finance" element={<PageAdmin />} /> */}
          {/* <Route path="/work/:id" element={<WorkInvoice />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}
