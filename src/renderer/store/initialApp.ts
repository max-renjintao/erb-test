import { deduplicateObj, deduplicateVar } from 'utils/deduplicate';
import { StoreData, StoreApp, TEAMS, STATUS } from './constants';

const initialApp = (data: StoreData, app: StoreApp): StoreApp => {
  const vehicles = deduplicateObj(
    'plate',
    data.works.map((w) => ({
      plate: w.plate,
      model: w.model,
      mileage: w.mileage,
      owner: w.owner,
      tel: w.tel,
      vip: w.vip,
    }))
  );
  const models = deduplicateVar(vehicles.map((v) => v.model));
  const needs = [
    ...new Set([
      ...data.works.map((w) => w.needs).flat(),
      ...data.orders.map((o) => o.description),
    ]),
  ];

  const jobs = deduplicateObj('code', [
    ...data.works.map((w) => w.jobs).flat(),
    ...data.jobs,
  ]);

  const mats = deduplicateObj('name', [
    ...data.works
      .map((w) => {
        return w.jobs.map((j) => j.mats);
      })
      .flat(2),
    ...data.mats,
  ]);

  return {
    ...app,
    workOps: {
      vehicles,
      models,
      needs,
      jobs,
      mats,
    },
  };
};

export default initialApp;
