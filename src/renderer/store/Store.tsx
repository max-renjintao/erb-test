import { useImmer } from 'use-immer';
import { createContext, useEffect, useState } from 'react';
import {
  appInit,
  dataInit,
  StoreApp,
  storeContextInit,
  StoreData,
} from 'renderer/store/constants';
import initialData from './initialData';

// export const saveData = (data: typeof dataInit) =>
//   window.electron.ipcRenderer.sendMessage('csv-write', [data]);

export const storeContext = createContext(storeContextInit);

const Store = ({ children }: { children: React.ReactNode }) => {
  // const [txt, imTxt] = useImmer(appInit);
  const [app, imApp] = useImmer(appInit);
  const [data, imData] = useImmer(dataInit);
  // const imData = (immer: (draft: WritableDraft<StoreData>) => void) => {
  //   setData((d) => produce(d, immer));
  // };
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('csv-read', []);
    window.electron.ipcRenderer.once('csv-read', (ipcData) => {
      imData(initialData(ipcData as StoreData));
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
