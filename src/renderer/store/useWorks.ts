/* eslint-disable @typescript-eslint/naming-convention */
import produce from 'immer';
import { useContext } from 'react';
import { workInit } from 'renderer/store/constants';

import { storeContext } from './Store';

const useWorks = () => {
  const store = useContext(storeContext);
  const {
    data,
    data: { works },
    saveData,
    imApp,
  } = store;
  const setId = (id: number) =>
    imApp((a) => {
      a.id = id;
      a.index = works.findIndex((w) => w.id === id);
    });
  const append = (work?: Work) => {
    // const index = works.findIndex((w) => w.id === id);
    saveData(
      produce(data, (d) => {
        d.works.push({
          ...(work || workInit),
          id: d.works.reduce((p, c) => Math.max(p, c.id), 0) + 1,
          sn: d.works.reduce((p, c) => Math.max(p, c.sn), 0) + 1,
          date_s: new Date(Date.now()),
          date_e: new Date(Date.now()),
        });
      })
    );
  };
  const remove = (index: number) => {
    // const index = works.findIndex((w) => w.id === index);

    saveData(
      produce(data, (d) => {
        d.works.splice(index, 1);
        // d.works.forEach((w, i) => {
        //   d.works[i].id = i + 1;
        // });
      })
    );
  };
  const update = (w: Work) => {
    works.forEach((v, id) => {
      if (v.id === w.id) {
        saveData(
          produce(data, (draft) => {
            draft.works[id] = w;
          })
        );
      }
    });
  };
  const options = (key: keyof Work) => [
    ...new Set(works.map((w) => `${w[key]}`)),
  ];

  return {
    ...store,
    works,
    setId,
    update,
    append,
    remove,
    options,
  };
};
export default useWorks;
