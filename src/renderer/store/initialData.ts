import produce from 'immer';
import getAmount from 'utils/getAmount';
import { StoreData } from './constants';

const initialData = (data: StoreData) => {
  return {
    ...data,
    works: produce(data.works, (dws) => {
      data.works.forEach((w, i) => {
        const amount = getAmount(data.works[i]);
        // console.log(amount);

        dws[i] = { ...dws[i], ...amount };
      });
    }),
  };
};

export default initialData;
