/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext } from 'react';
import { workInit } from 'renderer/store/constants';

import { storeContext } from './Store';

const useWorks = () => {
  const store = useContext(storeContext);
  const { data, imData } = store;
  const { works } = data;

  const append = useCallback(
    (work?: Work) => {
      imData((d) => {
        d.works.push({
          ...(work || workInit),
          id: works.length,
          sn: works.reduce((p, c) => Math.max(p, c.sn), 0) + 1,
          date_s: new Date(Date.now()),
          // date_e: new Date(Date.now()),
        });
      });
      console.log('% useWorks.append');
    },
    [works]
  );
  const remove = useCallback(
    (index: number) => {
      imData((d) => {
        d.works.splice(index, 1);
        for (let i = index; i < works.length - 1; i += 1) {
          console.log(i);

          d.works[i].id = i;
        }
      });
      console.log('% useWorks.remove');
    },
    [works]
  );
  const update = useCallback(
    (index: number, w: Work) => {
      if (index >= 0)
        imData((d) => {
          d.works[index] = w;
        });
      console.log('% useWorks.update');
    },
    [works]
  );
  console.log('% useWorks');

  return {
    // ...store,
    works,
    append,
    update,
    remove,
    // options: store.app.workOps,
  };
};
export default useWorks;
