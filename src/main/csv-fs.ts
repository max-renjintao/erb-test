import ctj from 'csvtojson';
import Jtc from 'objects-to-csv';
import path from 'path';
import { app } from 'electron';
import { StoreData } from 'renderer/store/constants';
import {
  strjsonArrToOrders,
  strjsonArrToJobs,
  strjsonArrToMats,
  worksToStrjsonArr,
  strjsonArrToWorks,
} from './strjsonConvert';

// export const ASSETS_PATH = app.isPackaged
//   ? process.resourcesPath
//   : path.join(__dirname, '../../assets');

const CSV_PATH = app.isPackaged
  ? path.join(process.resourcesPath, '../../data')
  : path.join(__dirname, '../../data');

const FN_WORKS = `${CSV_PATH}/works.csv`;
const FN_ORDERS = `${CSV_PATH}/orders.csv`;
const FN_JOBS = `${CSV_PATH}/jobs.csv`;
const FN_MATS = `${CSV_PATH}/mats.csv`;

export const csvReadWorks = async (event: Electron.IpcMainEvent) => {
  const workStrjsonArr = (await ctj().fromFile(FN_WORKS)) as WorkCsvjson[];
  const orderStrjsonArr = (await ctj().fromFile(FN_ORDERS)) as OrderCsvjson[];
  const jobStrjsonArr = (await ctj().fromFile(FN_JOBS)) as JobCsvjson[];
  const matStrjsonArr = (await ctj().fromFile(FN_MATS)) as MatCsvjson[];
  const data = {
    works: strjsonArrToWorks(workStrjsonArr),
    orders: strjsonArrToOrders(orderStrjsonArr),
    jobs: strjsonArrToJobs(jobStrjsonArr),
    mats: strjsonArrToMats(matStrjsonArr),
  };

  event.reply('csv-read', data);
};

export const csvWriteWorks = async (
  event: Electron.IpcMainEvent,
  [data]: [StoreData]
) => {
  const csv = new Jtc(worksToStrjsonArr(data.works));
  await csv.toDisk(FN_WORKS);
  event.reply('csv-write', data);
};

export const csvPath = async (event: Electron.IpcMainEvent) => {
  event.reply('csv-path', FN_WORKS);
};
