// type O = { sn: string | number } & { [k: string]: any };
export const deduplicateObj = <
  T extends { [k: string]: any },
  K extends string
>(
  key: K,
  arr: T[]
): T[] => arr.filter((v, i) => arr.findIndex((f) => f[key] === v[key]) === i);
export const deduplicateVar = <T>(arr: T[]): T[] => [...new Set(arr)];
