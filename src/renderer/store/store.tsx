import { createContext, useState } from 'react';
import { workInit } from 'renderer/constants';

export const worksInit: Work[] = [];
export const ordersInit: Order[] = [];
export const jobsInit: Job[] = [];
export const matsInit: Mat[] = [];

export const dataInit = {
  works: worksInit,
  orders: ordersInit,
  jobs: jobsInit,
  mats: matsInit,
};

export type StoreData = typeof dataInit;
export const saveData = (data: typeof dataInit) =>
  window.electron.ipcRenderer.sendMessage('csv-write', data as any);

export const csvContext = createContext({
  data: dataInit,
  saveData,
  id: 0,
  setId: (id: number) => {},
});

const Store = ({
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

export default Store;
