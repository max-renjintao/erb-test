/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext } from 'react';
import { workInit } from 'renderer/store/constants';

import { storeContext } from './Store';

const useWorks = () => {
  const store = useContext(storeContext);
  const { data, imData } = store;
  const { works } = data;

  const append = useCallback((work?: Work) => {
    imData((d) => {
      d.works.push({
        ...(work || workInit),
        id: d.works.reduce((p, c) => Math.max(p, c.id), 0) + 1,
        sn: d.works.reduce((p, c) => Math.max(p, c.sn), 0) + 1,
        date_s: new Date(Date.now()),
        date_e: new Date(Date.now()),
      });
    });
    console.log('% useWorks.append');
  }, []);
  const remove = useCallback((index: number) => {
    imData((d) => {
      d.works.splice(index, 1);
    });
    console.log('% useWorks.remove');
  }, []);
  const update = useCallback((index: number, w: Work) => {
    if (index >= 0)
      imData((d) => {
        d.works[index] = w;
      });
    console.log('% useWorks.update');
  }, []);
  console.log('% useWorks');

  return {
    ...store,
    works,
    append,
    update,
    remove,
    options: store.app.workOps,
  };
};
export default useWorks;
