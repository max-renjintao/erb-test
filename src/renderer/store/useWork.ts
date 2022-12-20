/* eslint-disable @typescript-eslint/naming-convention */
import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { jobInit, matInit, workInit } from 'renderer/store/constants';
import useWorks from './useWorks';

const useWork = () => {
  const store = useWorks();
  const { works, imData, data, app } = store;

  const work = works[app.index] || workInit;
  const imWork = (immer: (draft: WritableDraft<Work>) => void) => {
    imData((d) => {
      d.works[app.index] = produce(d.works[app.index], immer);
    });
  };
  const sumJobs = work.jobs.reduce((p, c) => p + c.cost, 0);
  const sumMats = work.jobs.reduce(
    (p, c) => p + c.mats.reduce((mp, mc) => mp + mc.qty * mc.rate, 0),
    0
  );
  const subTotal = sumJobs + sumMats;
  const totalAmount = subTotal * (1 + work.tax) + work.discount;

  const insertNeed = (index: number) =>
    imWork((d) => {
      d.needs.splice(index, 0, '');
    });

  const deleteNeed = (index: number) =>
    imWork((d) => {
      d.needs.splice(index, 1);
    });

  const insertJob = (index: number) => {
    imWork((d) => {
      d.jobs.splice(index, 0, jobInit);
    });
  };
  const deleteJob = (index: number) => {
    imWork((d) => {
      d.jobs.splice(index, 1);
    });
  };
  const insertMat = (jobId: number, index: number) => {
    imWork((d) => {
      d.jobs[jobId].mats.splice(index, 0, matInit);
    });
  };
  const deleteMat = (jobId: number, index: number) => {
    imWork((d) => {
      d.jobs[jobId].mats.splice(index, 1);
    });
  };
  return {
    ...store,
    work,
    imWork,
    sumJobs,
    sumMats,
    subTotal,
    totalAmount,
    insertNeed,
    deleteNeed,
    insertJob,
    deleteJob,
    insertMat,
    deleteMat,
  };
};
export default useWork;
