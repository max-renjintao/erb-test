type Vehicle = {
  plate: string;
  model: string;
  mileage: number;
  owner: string;
  tel: string;
  vip: string;
};

type Amount = {
  labor: number;
  material: number;
  sub_total: number;
  tax: number;
  discount: number;
  total: number;
  paid: number;
  labor_final: number;
  material_final: number;
  material_cost: number;
  tax_paid: number;
  profit: number;
};

type Work = Vehicle &
  Amount & {
    id: number;
    sn: number;
    date_s: Date;
    date_e: Date;

    team: number;
    status: number;

    needs: string[];
    jobs: Job[];
    note: string;
    notice: string;
  };
type WorkCsvjson = { [k in keyof Work]: string };

type Mat = {
  name: string;
  cost: number;
  qty: number;
  rate: number;
};
type MatCsvjson = { [k in keyof Mat]: string };

type Job = {
  code: string;
  item: string;
  cost: number;
  mats: Mat[];
};
type JobCsvjson = { [k in keyof Job]: string };

type Order = {
  sn: string;
  description: string;
};
type OrderCsvjson = { [k in keyof Order]: string };

type WorkOptions = {
  vehicles: Vehicle[];
  models: string[];
  needs: string[];
  jobs: Job[];
  mats: Mat[];
  // teams: number[];
  // status: string[];
};
