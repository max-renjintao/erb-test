import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import PeopleIcon from '@mui/icons-material/People';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import PaidIcon from '@mui/icons-material/Paid';
import Layout from './pages/layout';
import PageHome from './pages/page-home';
// import WorkInvoice from './pages/page-work-invoice';
import PageWorks from './pages/page-works';
import PageTeams from './pages/page-teams';
import PageMaterial from './pages/page-material';
import PageFinance from './pages/page-finance';

export default function App() {
  console.log('<App>');

  return (
    <Router>
      <Layout
        links={[
          { icon: <NewspaperIcon />, text: '', path: '/' },
          { icon: <CarCrashIcon />, text: '', path: '/works' },
          { icon: <PeopleIcon />, text: '', path: '/employee' },
          { icon: <WarehouseIcon />, text: '', path: '/material' },
          { icon: <PaidIcon />, text: '', path: '/finance' },
        ]}
      >
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/works" element={<PageWorks />} />
          <Route path="/employee" element={<PageTeams />} />
          <Route path="/material" element={<PageMaterial />} />
          <Route path="/finance" element={<PageFinance />} />
          {/* <Route path="/work/:id" element={<WorkInvoice />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}
