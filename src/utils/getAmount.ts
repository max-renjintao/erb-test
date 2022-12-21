/* eslint-disable @typescript-eslint/naming-convention */

export const getWorkLabor = (w: Work) =>
  w.jobs.length ? w.jobs.reduce((p, c) => p + c.cost, 0) : 0;
export const getWorkMaterial = (w: Work) => {
  const mats = w.jobs.map((j) => j.mats).flat();
  return mats ? mats.reduce((p, c) => p + c.rate * c.qty, 0) : 0;
};

const getAmount = (w: Work): Amount => {
  const { discount, tax, paid } = w;
  const labor = getWorkLabor(w);
  // console.log('material', mats);
  const material = getWorkMaterial(w);
  const mats = w.jobs.map((j) => j.mats).flat();
  const material_cost = mats ? mats.reduce((p, c) => p + c.cost, 0) : 0;
  const sub_total = labor + material;
  const discountPercent = sub_total ? 1 + w.discount / sub_total : 0;
  const labor_final = Math.round(labor * discountPercent);
  const material_final = Math.round(material * discountPercent);
  const total = (sub_total + w.discount) * (1 + w.tax);
  const tax_paid = total * tax;
  const paidAfterTax = paid - tax_paid;
  const laborShare = !sub_total ? 0 : labor / sub_total;
  const materialShare = !sub_total ? 0 : material / sub_total;
  const labor_paid = Math.round(laborShare * paidAfterTax);
  const material_paid = Math.round(materialShare * paidAfterTax);
  const profit = material_paid - material_cost;
  return {
    labor,
    material,
    sub_total,
    labor_final,
    material_final,
    material_cost,
    total,
    discount,
    tax,
    paid,
    labor_paid,
    material_paid,
    tax_paid,
    profit,
  };
};
export default getAmount;
