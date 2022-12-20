import { CssBaseline } from '@mui/material';
import produce from 'immer';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreData } from './store/constants';
import IpcStore from './store/IpcStore';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <IpcStore>
    <CssBaseline />
    <App />
  </IpcStore>
);
