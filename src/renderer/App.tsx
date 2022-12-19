import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/layout';
// import WorkInvoice from './pages/page-work-invoice';
import WorksPage from './pages/page-works';

export default function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<WorksPage />} />
          {/* <Route path="/work/:id" element={<WorkInvoice />} /> */}
        </Routes>
      </Router>
    </Layout>
  );
}
