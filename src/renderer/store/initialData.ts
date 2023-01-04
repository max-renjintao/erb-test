/* eslint-disable @typescript-eslint/naming-convention */
import { StoreData } from 'constants/const-store';
import produce from 'immer';
import getAmount from 'utils/getAmount';

const initialData = (data: StoreData) => {
  return {
    ...data,
    works: produce(data.works, (dws) => {
      data.works.forEach((w, i) => {
        const amount = getAmount(data.works[i]);
        const now = new Date(Date.now());
        const date_e = w.status < 4 ? now : w.date_e;
        dws[i] = { ...dws[i], id: i, date_e, ...amount };
      });
    }),
  };
};

export default initialData;
