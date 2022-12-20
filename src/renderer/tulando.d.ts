type Vehicle = {
  plate: string;
  model: string;
  mileage: number;
  owner: string;
  tel: string;
  vip: string;
};

type Amount = {
  total: number;
  labor_final: number;
  material_final: number;
  material_cost: number;
  discount: number;
  tax: number;
  paid: number;
};

type Work = Vehicle &
  Amount & {
    id: number;
    sn: number;
    date_s: Date;
    date_e: Date;

    team: string;
    status: string;

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

type WorkOps = {
  vehicles: Vehicle[];
  models: string[];
  needs: string[];
  jobs: Job[];
  mats: Mat[];
  teams: string[];
  status: string[];
};
