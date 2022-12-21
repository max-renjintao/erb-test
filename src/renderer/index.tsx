import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import App from './App';
import Store from './store/Store';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Store>
    <CssBaseline />
    <App />
  </Store>
);
