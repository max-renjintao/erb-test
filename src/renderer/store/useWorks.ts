import produce from 'immer';
import { useContext } from 'react';
import { workInit } from 'renderer/constants';
import { deduplicateObj } from 'renderer/utils/deduplicate';
import { csvContext } from './store';

const useWorks = () => {
  const { data, saveData } = useContext(csvContext);
  const { works, orders: os, jobs: js, mats: ms } = data;
  const insert = (id: number, work?: Work) => {
    const index = works.findIndex((w) => w.id === id);
    saveData(
      produce(data, (d) => {
        d.works.splice(index + 1, 0, {
          ...workInit,
          id: d.works.reduce((p, c) => Math.max(p, c.id), 0) + 1,
          sn: d.works.reduce((p, c) => Math.max(p, c.sn), 0) + 1,
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
  const orders = [
    ...new Set([
      ...works.map((w) => w.orders).flat(),
      ...os.map((o) => o.description),
    ]),
  ];

  const jobs = deduplicateObj('code', [
    ...works.map((w) => w.jobs).flat(),
    ...js,
  ]);
  const mats = deduplicateObj('name', [
    ...works.map((w) => w.jobs.map((j) => j.mats)).flat(2),
    ...ms,
  ]);
  const lookFor = ({ sn, item }: { sn?: string; item?: string }) =>
    works.map((w) => w.jobs).flat;
  return {
    works,
    update,
    insert,
    remove,
    options,
    orders,
    jobs,
    mats,
  };
};
export default useWorks;
