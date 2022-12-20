export const matInit: Mat = { name: '', qty: 0, cost: 0, rate: 0 };
export const jobInit: Job = { code: '', item: '', cost: 0, mats: [] };
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
  orders: [],
  jobs: [],
  discount: 0,
  note: '',
  total: 0,
  labor_final: 0,
  material_cost: 0,
  material_final: 0,
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
