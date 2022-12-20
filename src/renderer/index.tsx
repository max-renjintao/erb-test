import { CssBaseline } from '@mui/material';
import produce from 'immer';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreData } from './store/constants';
import IpcStore from './store/IpcStore';

const container = document.getElementById('root')!;
const root = createRoot(container);

const rootRender = (data: StoreData) =>
  root.render(
    <IpcStore
      data={data}
      // data={strjsonArrToWorks(csvData)}
    >
      <CssBaseline />
      <App />
    </IpcStore>
  );
window.electron.ipcRenderer.sendMessage('csv-read', []);
window.electron.ipcRenderer.once('csv-read', (data) => {
  console.log('***csv-read.once', data);

  rootRender(
    produce(data as StoreData, (d) => {
      d.works = d.works.sort((a, b) => a.sn - b.sn);
      d.works.forEach((w) => {
        const labor = w.jobs.length
          ? w.jobs.reduce((p, c) => p + c.cost, 0)
          : 0;
        const material = w.jobs.length
          ? w.jobs
              .map((j) => j.mats)
              .flat()
              .reduce((p, c) => p + c.cost, 0)
          : 0;
        const subtotal = labor + material;
        const discountPercent = subtotal ? 1 + w.discount / subtotal : 0;
        w.labor_final = labor * discountPercent;
        w.material_final = material * discountPercent;
        w.total = (subtotal + w.discount) * (1 + w.tax);
      });
    })
  );
});
window.electron.ipcRenderer.on('csv-write', (data) => {
  rootRender(data as StoreData);
});
