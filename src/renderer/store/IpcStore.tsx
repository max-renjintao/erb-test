import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { createContext, useEffect, useState } from 'react';
import { dataInit, StoreData, workInit } from 'renderer/store/constants';
import initialData from './initialData';

// export const saveData = (data: typeof dataInit) =>
//   window.electron.ipcRenderer.sendMessage('csv-write', [data]);

export const storeContext = createContext({
  data: dataInit,
  // setData: (data: StoreData) => {},
  imData: (immer: (draft: WritableDraft<StoreData>) => void) => {},
  saveData: (data: StoreData) => {},
  id: 0,
  setId: (id: number) => {},
});

const IpcStore = ({
  // data,
  children,
}: {
  // data: StoreData;
  children: React.ReactNode;
}) => {
  const [id, setId] = useState(0);
  const [data, setData] = useState(dataInit);
  const imData = (immer: (draft: WritableDraft<StoreData>) => void) => {
    setData((d) => produce(d, immer));
  };
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('csv-read', []);
    window.electron.ipcRenderer.once('csv-read', (ipcData) => {
      setData(initialData(ipcData as StoreData));
    });
    window.electron.ipcRenderer.on('csv-write', (d) => {
      setData(d as StoreData);
    });
  }, []);
  const saveData = (d: StoreData) => {
    window.electron.ipcRenderer.sendMessage('csv-write', [d]);
  };
  return (
    <storeContext.Provider value={{ data, imData, saveData, id, setId }}>
      {children}
    </storeContext.Provider>
  );
};

export default IpcStore;
