/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { useCallback, useEffect, useState } from 'react';
import { workInit } from 'renderer/store/constants';
import { Updater, useImmer } from 'use-immer';
import getAmount from 'utils/getAmount';
import ObjectEntries from 'utils/ObjectEntries';
import useWorks from './useWorks';

const useWork = (index: number) => {
  const { works, app, update, remove } = useWorks();
  const [work, ImWork] = useImmer(workInit);
  const [isEdited, setIsEdited] = useState(false);
  const imWork: Updater<Work> = useCallback((immer) => {
    ImWork(immer);
    setIsEdited(true);
    // console.log('% useWork imWork, isEdited:', isEdited);
  }, []);
  // const reset=()=>{

  // }
  useEffect(() => {
    ImWork(works[app.index]);
    setIsEdited(false);
    // console.log(`% useWork. useEffect. reassignment: from works[${app.index}]`);
  }, [app.index, ImWork, works]);

  useEffect(() => {
    if (work) {
      ImWork((w) => {
        if (w) {
          const amount = getAmount(work);
          ObjectEntries(amount).forEach(([k, v]) => {
            w[k] = v;
          });
          // console.log('% useWork. useEffect. calc amount...');
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [work?.jobs, work?.tax, work?.discount, work?.paid]);

  // console.log('% useWork');

  return {
    index,
    work,
    imWork,
    isEdited,
    update: () => {
      setIsEdited(false);
      update(index, work);
      // console.log('% useWork update, isEdited:', isEdited);
    },
    remove: () => remove(index),
  };
};
export default useWork;
