import { Updater } from 'use-immer';

export const matInit: Mat = { name: '', qty: 0, cost: 0, rate: 0 };
export const jobInit: Job = { code: '', item: '', cost: 0, mats: [matInit] };
export const workInit: Work = {
  id: 0,
  sn: 0,
  date_e: new Date(),
  date_s: new Date(),
  plate: '',
  model: '',
  mileage: 0,
  owner: '',
  tax: 0,
  team: '',
  status: '',
  vip: '',
  tel: '',
  needs: [],
  jobs: [],
  discount: 0,
  note: '',
  total: 0,
  labor_final: 0,
  material_cost: 0,
  material_final: 0,
  paid: 0,
  notice: '',
  labor: 0,
  material: 0,
  sub_total: 0,
  tax_paid: 0,
  profit: 0,
};
export const worksInit: Work[] = [];
export const ordersInit: Order[] = [];
export const jobsInit: Job[] = [];
export const matsInit: Mat[] = [];

export const dataInit = {
  works: worksInit,
  orders: ordersInit,
  jobs: jobsInit,
  mats: matsInit,
};

export type StoreData = typeof dataInit;
export const appInit = {
  // id: 0,
  index: 0,
  // work: workInit,
  showDialogWorkEdit: false,
  // isEdited: false,
  workOps: {
    vehicles: [],
    models: [],
    needs: [],
    jobs: [],
    mats: [],
    teams: [],
    status: [],
  } as WorkOptions,
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

export const TEAMS = ['汪攀', '王毅', '杨波', 'Non'];
export const TEAMCOLORS = [
  '#aaaa0080',
  'rgba(53, 162, 235, 0.5)',
  '#88330080',
  '#cccccc80',
];
export const STATUS = ['paid', 'done', 'doing', 'quotation', 'await'];
