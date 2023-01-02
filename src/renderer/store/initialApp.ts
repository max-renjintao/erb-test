import { StoreApp, StoreData } from 'constants/const-store';
import { deduplicateObj, deduplicateVar } from 'utils/deduplicate';

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
  console.log(`%2 initialApp(data) data=`, data);

  const needs = [
    ...new Set([
      ...data.works
        .map((w) => w.needs)
        .flat()
        .filter((f) => !!f),
      ...data.needs.map((o) => o.description),
    ]),
  ];

  const jobs = deduplicateObj('code', [
    ...data.works
      .map((w) => w.jobs)
      .flat()
      .filter((f) => !!f),
    ...data.jobs,
  ]);

  const mats = deduplicateObj('name', [
    ...data.works
      .map((w) => {
        return w.jobs.map((j) => j.mats);
      })
      .flat(2)
      .filter((f) => !!f),
    ...data.mats,
  ]);

  return {
    ...app,
    options: {
      vehicles,
      models,
      needs,
      jobs,
      mats,
    },
  };
};

export default initialApp;
