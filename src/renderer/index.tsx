import { CssBaseline } from '@mui/material';
import produce from 'immer';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreData } from './store/constants';
import Store from './store/Store';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Store>
    <CssBaseline />
    <App />
  </Store>
);
