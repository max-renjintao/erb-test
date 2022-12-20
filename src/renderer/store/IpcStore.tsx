import { createContext, useState } from 'react';
import { dataInit, StoreData, workInit } from 'renderer/store/constants';

export const saveData = (data: typeof dataInit) =>
  window.electron.ipcRenderer.sendMessage('csv-write', [data]);

export const csvContext = createContext({
  data: dataInit,
  saveData,
  id: 0,
  setId: (id: number) => {},
});

const IpcStore = ({
  data,
  children,
}: {
  data: StoreData;
  children: React.ReactNode;
}) => {
  const [id, setId] = useState(0);
  return (
    <csvContext.Provider value={{ data, saveData, id, setId }}>
      {children}
    </csvContext.Provider>
  );
};

export default IpcStore;
