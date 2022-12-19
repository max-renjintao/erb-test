type WorkKeysNum =
  | 'id'
  | 'sn'
  | 'mileage'
  | 'tax'
  | 'discount'
  | 'total'
  | 'labor_final'
  | 'material_final'
  | 'material_cost';

type WorkKeysStr =
  | 'date_s'
  | 'date_e'
  | 'plate'
  | 'model'
  | 'owner'
  | 'tel'
  | 'vip'
  | 'status'
  | 'team'
  | 'note';

type WorkKeysJson = 'orders' | 'jobs';

type WorkKeys = WorkKeysNum | WorkKeysStr | WorkKeysJson | 'display';

type WorkCsvjson = { [k in WorkKeys]: string };

type Work = {
  id: number;
  sn: number;
  date_s: Date;
  date_e: Date;
  plate: string;
  model: string;
  mileage: number;
  owner: string;
  tax: number;
  team: string;
  status: string;
  vip: string;
  tel: string;
  orders: string[];
  jobs: Job[];
  discount: number;
  note: string;
  total: number;
  labor_final: number;
  material_final: number;
  material_cost: number;
  // display: {
  //   en: boolean;
  //   zh: boolean;
  // };
};

type MatKeys = 'name' | 'cost' | 'qty' | 'rate';
type MatCsvjson = { [k in MatKeys]: string };
type Mat = {
  name: string;
  cost: number;
  qty: number;
  rate: number;
};
type JobKeys = 'code' | 'item' | 'cost' | 'mats';
type JobCsvjson = { [k in JobKeys]: string };
type Job = {
  code: string;
  item: string;
  cost: number;
  mats: Mat[];
};

type OrderKeys = 'sn' | 'description';
type OrderCsvjson = { [k in OrderKeys]: string };
type Order = {
  sn: string;
  description: string;
};
