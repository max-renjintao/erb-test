export type Vehicle = typeof vehicleInit;
export const vehicleInit = {
  plate: '',
  model: '',
  mileage: 0,
  owner: '',
  tel: '',
  vip: '',
};

export const FUEL_TYPE = ['', 'petrol', 'diesel'];

export type VehicleMore = typeof vehicleMoreInit;
export const vehicleMoreInit = {
  fuelType: 0, // FUEL_TYPE
  chassisNo: '',
  engineNo: '',
  capacity: '',
  makeYear: 0,
  tireSize: '',
};

export type MatCsvjson = { [k in keyof Mat]: string };
export type Mat = typeof matInit;
export const matInit = {
  name: '',
  qty: 0,
  cost: 0,
  rate: 0,
};

export type JobCsvjson = { [k in keyof Job]: string };
export type Job = typeof jobInit;
export const jobInit = {
  code: '',
  item: '',
  cost: 0,
  mats: [matInit],
  joinUp: false,
};

export type Amount = typeof amountInit;
export const amountInit = {
  labor: 0,
  material: 0,
  sub_total: 0,
  tax: 0,
  discount: 0,
  total: 0,
  paid: 0,
  labor_final: 0,
  material_final: 0,
  material_cost: 0,
  tax_paid: 0,
  profit: 0,
};

export const workBaseInit = {
  id: 0,
  sn: 0,
  date_e: new Date(),
  date_s: new Date(),
  team: 0,
  status: 1,
  note: '',
};

export type WorkCsvjson = { [k in keyof Work]: string };
export type Work = typeof workInit;
export const workInit = {
  ...workBaseInit,
  ...vehicleInit,
  needs: [''],
  jobs: [jobInit],
  notice: '',
  ...amountInit,
  docOptions: [0],
};

export type OrderCsvjson = { [k in keyof Order]: string };
export type Order = {
  sn: string;
  description: string;
};

export const HEADERS = [
  '',
  'QUOTATION',
  'Reception',
  'Job Card',
  'Preform Invoice',
  'Payment Archive',
];
export const STATUS = ['', 'wait', 'recept', 'doing', 'bill', 'pay'];
export const TEAMS = ['Non', '汪攀', '王毅', '杨波'];
export const TEAM_COLORS = ['#cccccc', '#4377ff', '#883300', '#aaaa00'];
