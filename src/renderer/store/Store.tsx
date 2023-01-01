/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
import { DraftFunction, Updater, useImmer } from 'use-immer';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { appInit, dataInit, storeContextInit, StoreData } from './constants';
import initialData from './initialData';
import initialApp from './initialApp';

export const storeContext = createContext(storeContextInit);

export const useStore = () => useContext(storeContext);

const Store = ({ children }: { children: React.ReactNode }) => {
  const [app, imApp] = useImmer(appInit);
  const [data, _imData] = useImmer(dataInit);
  const [dataEdited, setDateEdited] = useState(false);
  const imData: Updater<StoreData> = useCallback((arg) => {
    _imData(arg);
    setDateEdited(true);
    console.log('% store.imDate,dataEdited:', dataEdited);
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('csv-path', []);
    window.electron.ipcRenderer.once('csv-path', (path) => {
      imApp((a) => {
        a.csvFilePath = path as string;
      });
      console.info('% store.effect: csv-path:', path);
    });
  }, []);

  useEffect(() => {
    if (app.csvFilePath) {
      window.electron.ipcRenderer.sendMessage('csv-read', []);
      window.electron.ipcRenderer.once('csv-read', (ipcData) => {
        imData(initialData(ipcData as StoreData));
        imApp(
          initialApp(ipcData as StoreData, {
            ...app,
            csvFilePath: app.csvFilePath as string,
          })
        );
      });

      window.electron.ipcRenderer.on('csv-write', (d) => {
        _imData((dd) => {
          dd.works = (d as StoreData).works;
        });
      });
      console.info('% store.effect: data read');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.csvFilePath]);

  useEffect(() => {
    if (dataEdited) {
      setDateEdited(false);
      window.electron.ipcRenderer.sendMessage('csv-write', [data]);
      console.info('% store.effect: data saved');
    }
  }, [dataEdited]);

  console.log('% Store');

  return (
    <storeContext.Provider value={{ data, imData, app, imApp }}>
      {children}
    </storeContext.Provider>
  );
};

export default Store;
