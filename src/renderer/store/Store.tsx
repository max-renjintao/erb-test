import { useImmer } from 'use-immer';
import { createContext, useEffect } from 'react';
import { appInit, dataInit, storeContextInit, StoreData } from './constants';
import initialData from './initialData';
import initialApp from './initialApp';

export const storeContext = createContext(storeContextInit);

const Store = ({ children }: { children: React.ReactNode }) => {
  const [app, imApp] = useImmer(appInit);
  const [data, imData] = useImmer(dataInit);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('csv-read', []);
    window.electron.ipcRenderer.once('csv-read', (ipcData) => {
      window.electron.ipcRenderer.sendMessage('csv-path', []);
      window.electron.ipcRenderer.once('csv-path', (path) => {
        imData(initialData(ipcData as StoreData));
        imApp(
          initialApp(ipcData as StoreData, {
            ...app,
            csvFilePath: path as string,
          })
        );
      });
      // console.log('app', app);
    });
    window.electron.ipcRenderer.on('csv-write', (d) => {
      imData((dd) => {
        dd.works = (d as StoreData).works;
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const saveData = (d: StoreData) => {
    window.electron.ipcRenderer.sendMessage('csv-write', [d]);
  };
  return (
    <storeContext.Provider value={{ data, imData, saveData, app, imApp }}>
      {children}
    </storeContext.Provider>
  );
};

export default Store;
