const ObjectEntries = <T extends { [k in string]: any }>(object: T) =>
  Object.entries(object) as {
    [K in keyof T]: [K, T[K]];
  }[keyof T][];

export default ObjectEntries;
