/**
 * 提供一个 work 状态对象，取值来自 Store.data.works
 * 可以 更新/删除 store.data.works 中的对应 work
 */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { useCallback, useEffect, useState } from 'react';
import { workInit } from 'constants/const-work';
import { Updater, useImmer } from 'use-immer';
import getAmount from 'utils/getAmount';
import ObjectEntries from 'utils/ObjectEntries';
import useWorks from './useWorks';

const useWork = (index: number) => {
  const { works, update, remove } = useWorks();
  const [work, _imWork] = useImmer(workInit);
  const [isEdited, setIsEdited] = useState(false);
  const imWork: Updater<Work> = useCallback((immer) => {
    _imWork(immer || workInit);
    setIsEdited(true);
    console.log('% useWork imWork, isEdited:', isEdited);
  }, []);
  // const reset=()=>{

  // }
  useEffect(() => {
    _imWork(works[index]);
    setIsEdited(false);
    // console.log(`% useWork. useEffect. reassignment: from works[${app.index}]`);
  }, [index, _imWork, works]);

  useEffect(() => {
    if (work) {
      _imWork((w) => {
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
    remove: () => {
      setIsEdited(false);
      remove(index);
    },
  };
};
export default useWork;
