/* eslint-disable @typescript-eslint/naming-convention */
import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { useMemo, useState } from 'react';
import { jobInit, matInit } from 'renderer/constants';
import { deduplicateObj } from 'renderer/utils/deduplicate';
import useWorks from './useWorks';

const useWork = () => {
  const store = useWorks();
  const { works, data, id } = store;
  const [work, setWork] = useState(works.find((w) => w.id === id) as Work);
  const setWorkImmer = (func: (draft: WritableDraft<Work>) => void) => {
    setWork((w) => produce(w, func));
  };
  const sumJobs = work.jobs.reduce((p, c) => p + c.cost, 0);
  const sumMats = work.jobs.reduce(
    (p, c) => p + c.mats.reduce((mp, mc) => mp + mc.qty * mc.rate, 0),
    0
  );
  const subTotal = sumJobs + sumMats;
  const totalAmount = subTotal * (1 + work.tax) + work.discount;

  const orders = useMemo(
    () => [
      ...new Set([
        ...works.map((w) => w.orders).flat(),
        ...data.orders.map((o) => o.description),
      ]),
    ],
    [works, data.orders]
  );
  const jobs = useMemo(
    () =>
      deduplicateObj('code', [
        ...works.map((w) => w.jobs).flat(),
        ...data.jobs,
      ]),
    [works, data.jobs]
  );
  const mats = useMemo(
    () =>
      deduplicateObj('name', [
        ...works.map((w) => w.jobs.map((j) => j.mats)).flat(2),
        ...data.mats,
      ]),
    [works, data.mats]
  );
  const insertOrder = (pos: number) =>
    setWorkImmer((d) => {
      d.orders.splice(pos, 0, '');
    });

  const deleteOrder = (pos: number) =>
    setWorkImmer((d) => {
      d.orders.splice(pos, 1);
    });

  const insertJob = (pos: number) => {
    setWorkImmer((d) => {
      d.jobs.splice(pos, 0, jobInit);
    });
  };
  const deleteJob = (pos: number) => {
    setWorkImmer((d) => {
      d.jobs.splice(pos, 1);
    });
  };
  const insertMat = (jobId: number, pos: number) => {
    setWorkImmer((d) => {
      d.jobs[jobId].mats.splice(pos, 0, matInit);
    });
  };
  const deleteMat = (jobId: number, pos: number) => {
    setWorkImmer((d) => {
      d.jobs[jobId].mats.splice(pos, 1);
    });
  };
  return {
    ...store,
    works,
    work,
    setWork,
    setWorkImmer,
    sumJobs,
    sumMats,
    subTotal,
    totalAmount,
    insertOrder,
    deleteOrder,
    insertJob,
    deleteJob,
    insertMat,
    deleteMat,
    orders,
    jobs,
    mats,
  };
};
export default useWork;
