/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { workInit } from 'renderer/store/constants';
import { useImmer } from 'use-immer';
import getAmount from 'utils/getAmount';
import ObjectEntries from 'utils/ObjectEntries';
import useWorks from './useWorks';

// const ObjectEntries = <T extends { [k: string]: any }>(Obj: T) => [keyof T,T[keyof T]][]

const useWork = (index: number) => {
  const { works, app, update, remove } = useWorks();
  const [work, imWork] = useImmer(workInit);

  useEffect(() => {
    imWork(works[app.index]);
    console.log(`% useWork. useEffect. reassignment:from works[${app.index}]`);
  }, [app.index, imWork, works]);

  useEffect(() => {
    if (work) {
      imWork((w) => {
        if (w) {
          const amount = getAmount(work);
          ObjectEntries(amount).forEach(([k, v]) => {
            w[k] = v;
          });
          console.log('% useWork. useEffect. calc amount...');
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [work?.jobs, work?.tax, work?.discount, work?.paid]);

  console.log('% useWork');

  return {
    index,
    work,
    imWork,
    // isEdited: app.isEdited,
    update: () => {
      update(index, work);
    },
    remove: () => remove(index),
  };
};
export default useWork;
