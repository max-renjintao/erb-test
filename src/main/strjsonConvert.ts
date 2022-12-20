import jsonParse from './jsonParse';
import { dateFormat, dateParse } from '../utils/date';

export const strjsonToWork = (sj: WorkCsvjson): Work => ({
  ...sj,
  id: +sj.id,
  sn: +sj.sn,
  mileage: +sj.mileage,
  tax: +sj.tax,
  total: +sj.total,
  labor_final: +sj.labor_final,
  material_final: +sj.material_final,
  material_cost: +sj.material_cost,
  discount: +sj.discount,
  date_s: dateParse(sj.date_s),
  date_e: dateParse(sj.date_e),
  needs: jsonParse(sj.needs as string),
  jobs: jsonParse(sj.jobs as string),
});
export const workToStrjson = (w: Work): WorkCsvjson => ({
  ...w,
  id: `${w.id}`,
  sn: `${w.sn}`,
  mileage: `${w.mileage}`,
  tax: `${w.tax}`,
  discount: `${w.discount}`,
  total: `${w.total}`,
  labor_final: `${w.labor_final}`,
  material_final: `${w.material_final}`,
  material_cost: `${w.material_cost}`,
  date_s: dateFormat(w.date_s),
  date_e: dateFormat(w.date_e),
  needs: JSON.stringify(w.needs),
  jobs: JSON.stringify(w.jobs),
});

export const strjsonArrToWorks = (sjArr: WorkCsvjson[]) =>
  sjArr.map((sj) => strjsonToWork(sj));
export const worksToStrjsonArr = (works: Work[]) =>
  works.map((w) => workToStrjson(w));

export const strjsonToOrder = (sj: OrderCsvjson): Order => ({
  ...sj,
});
// export const orderToStrjson = (o: Order) => ({
//   ...o,
// });
export const strjsonArrToOrders = (sjArr: OrderCsvjson[]): Order[] =>
  sjArr.map((sj) => strjsonToOrder(sj));
// export const OrdersToStrjsonArr = (works: Order[]) =>
//   works.map((w) => orderToStrjson(w));

export const strjsonToMat = (sj: MatCsvjson): Mat => ({
  ...sj,
  cost: +sj.cost,
  qty: +sj.qty,
  rate: +sj.rate,
});
export const strjsonArrToMats = (sjArr: MatCsvjson[]): Mat[] =>
  sjArr.map((sj) => strjsonToMat(sj));

export const strjsonToJob = (sj: JobCsvjson): Job => ({
  ...sj,
  cost: +sj.cost,
  mats: [],
});

export const strjsonArrToJobs = (sjArr: JobCsvjson[]): Job[] =>
  sjArr.map((sj) => strjsonToJob(sj));
