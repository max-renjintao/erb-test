import { useContext } from 'react';
import { storeContext } from './Store';

const useApp = () => {
  const { app, imApp } = useContext(storeContext);
  return { app, imApp };
};
export default useApp;
