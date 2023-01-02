/* eslint-disable no-nested-ternary */
import {
  Job,
  JobCsvjson,
  Mat,
  MatCsvjson,
  Order,
  OrderCsvjson,
  WorkCsvjson,
  workInit,
} from '../constants/const-work';
import jsonParse from './jsonParse';
import { dateFormat, dateParse } from './date';
import ObjectEntries from './ObjectEntries';

export const strjsonToWork = (sj: WorkCsvjson): Work => {
  console.log('sj', sj);

  const w = {} as Work;
  ObjectEntries(sj).forEach(([k, v]) => {
    w[k] = (
      typeof workInit[k] === 'string'
        ? v
        : typeof workInit[k] === 'number'
        ? +v
        : workInit[k] instanceof Date
        ? dateParse(v)
        : jsonParse(v)
    ) as never;
  });
  console.log('w', w);

  return w;
};

export const workToStrjson = (w: Work): WorkCsvjson => {
  const sj = {} as WorkCsvjson;
  ObjectEntries(w).forEach(([k, v]) => {
    sj[k] =
      typeof v === 'string'
        ? v
        : v instanceof Date
        ? dateFormat(v)
        : typeof v === 'object'
        ? JSON.stringify(v)
        : `${v}`;
  });

  return sj;
};

export const strjsonArrToWorks = (sjArr: WorkCsvjson[]) =>
  sjArr.map((sj) => strjsonToWork(sj));

export const worksToStrjsonArr = (works: Work[]) =>
  works.map((w) => workToStrjson(w));

export const strjsonToOrder = (sj: OrderCsvjson): Order => ({
  ...sj,
});
export const orderToStrjson = (o: Order) => ({
  ...o,
});
export const strjsonArrToOrders = (sjArr: OrderCsvjson[]): Order[] =>
  sjArr.map((sj) => strjsonToOrder(sj));
export const OrdersToStrjsonArr = (works: Order[]) =>
  works.map((w) => orderToStrjson(w));

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
  join: false,
});

export const strjsonArrToJobs = (sjArr: JobCsvjson[]): Job[] =>
  sjArr.map((sj) => strjsonToJob(sj));
