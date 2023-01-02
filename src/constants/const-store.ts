import { Updater } from 'use-immer';
import { Job, Mat, Order, Vehicle, Work } from './const-work';

export const worksInit: Work[] = [];
export const needsInit: Order[] = [];
export const jobsInit: Job[] = [];
export const matsInit: Mat[] = [];

export const dataInit = {
  works: worksInit,
  needs: needsInit,
  jobs: jobsInit,
  mats: matsInit,
};
export type Options = {
  vehicles: Vehicle[];
  models: string[];
  needs: string[];
  jobs: Job[];
  mats: Mat[];
  // teams: number[];
  // status: string[];
};
export type StoreData = typeof dataInit;
export const appInit = {
  usr: 0,
  index: 0,
  usrTeamIdx: 0,
  showDialogWorkEdit: false,
  options: {
    vehicles: [],
    models: [],
    needs: [],
    jobs: [],
    mats: [],
    // teams: [],
    // status: [],
  } as Options,
  csvFilePath: '',
};
export type StoreApp = typeof appInit;

export const storeContextInit = {
  data: dataInit,
  imData: (() => {}) as Updater<StoreData>,
  // saveData: () => {},
  app: appInit,
  imApp: (() => {}) as Updater<StoreApp>,
};
