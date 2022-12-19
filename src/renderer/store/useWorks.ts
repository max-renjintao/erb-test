/* eslint-disable @typescript-eslint/naming-convention */
import produce from 'immer';
import { useContext } from 'react';
import { workInit } from 'renderer/constants';

import { csvContext } from './store';

const useWorks = () => {
  const store = useContext(csvContext);
  const {
    data,
    data: { works },
    saveData,
  } = store;
  const insert = (id: number, work?: Work) => {
    const index = works.findIndex((w) => w.id === id);
    saveData(
      produce(data, (d) => {
        d.works.splice(index + 1, 0, {
          ...(work || workInit),
          id: d.works.reduce((p, c) => Math.max(p, c.id), 0) + 1,
          sn: d.works.reduce((p, c) => Math.max(p, c.sn), 0) + 1,
          date_s: new Date(Date.now()),
          date_e: new Date(Date.now()),
        });
      })
    );
  };
  const remove = (id: number) => {
    const index = works.findIndex((w) => w.id === id);
    if (index)
      saveData(
        produce(data, (d) => {
          d.works.splice(index, 1);
          d.works.forEach((w, i) => {
            d.works[i].id = i + 1;
          });
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
  const options = (key: WorkKeys) => [
    ...new Set(works.map((w) => `${w[key]}`)),
  ];

  return {
    ...store,
    works,
    update,
    insert,
    remove,
    options,
  };
};
export default useWorks;
