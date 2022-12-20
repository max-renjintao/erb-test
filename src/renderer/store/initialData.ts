import produce from 'immer';
import { StoreData } from './constants';

const initialData = (data: StoreData) => {
  return {
    ...(data as StoreData),
    works: produce((data as StoreData).works, (dws) => {
      dws.forEach((w) => {
        const labor = w.jobs.length
          ? w.jobs.reduce((p, c) => p + c.cost, 0)
          : 0;
        const material = w.jobs.length
          ? w.jobs
              .map((j) => j.mats)
              .flat()
              .reduce((p, c) => p + c.cost, 0)
          : 0;
        const subtotal = labor + material;
        const discountPercent = subtotal ? 1 + w.discount / subtotal : 0;
        w.labor_final = labor * discountPercent;
        w.material_final = material * discountPercent;
        w.total = (subtotal + w.discount) * (1 + w.tax);
      });
    }),
  };
};

export default initialData;
