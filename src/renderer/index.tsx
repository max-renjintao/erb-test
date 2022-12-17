import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import App from './App';
import Store from './store/store';
import {
  strjsonArrToJobs,
  strjsonArrToMats,
  strjsonArrToOrders,
  strjsonArrToWorks,
} from './utils/strjsonConvert';

const container = document.getElementById('root')!;
const root = createRoot(container);

window.electron.ipcRenderer.sendMessage('csv-read', []);
window.electron.ipcRenderer.on('csv-read', (data) => {
  // console.log(csvData);

  root.render(
    <Store
      data={data as any}
      // data={strjsonArrToWorks(csvData)}
    >
      <CssBaseline />
      <App />
    </Store>
  );
});
