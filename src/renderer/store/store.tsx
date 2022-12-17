import { createContext } from 'react';

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
});

const Store = ({
  data,
  children,
}: {
  data: StoreData;
  children: React.ReactNode;
}) => {
  return (
    <csvContext.Provider value={{ data, saveData }}>
      {children}
    </csvContext.Provider>
  );
};

export default Store;
