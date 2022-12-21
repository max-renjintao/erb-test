/* eslint-disable @typescript-eslint/naming-convention */
import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { jobInit, matInit, workInit } from 'renderer/store/constants';
import getAmount from 'utils/getAmount';
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
    amount: getAmount(work),
    insertNeed,
    deleteNeed,
    insertJob,
    deleteJob,
    insertMat,
    deleteMat,
  };
};
export default useWork;
