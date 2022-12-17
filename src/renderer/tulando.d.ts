type WorkKeysNum =
  | 'id'
  | 'sn'
  | 'mileage'
  // | 'labor'
  // | 'material'
  | 'tax'
  | 'discount';
// | 'total';

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

type WorkKeys = WorkKeysNum | WorkKeysStr | WorkKeysJson;

type WorkCsvjson = { [k in WorkKeys]: string };

type Work = {
  id: number;
  sn: number;
  date_s: string;
  date_e: string;
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
  // maintenances: [string, string, number, [string, number, number][]][];
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
