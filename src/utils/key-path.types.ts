// import { List, Record, Map } from "immutable";

export type Map<K, T> = { [k in K]: T };

export type KeyOf<D> = D extends Array<any>
  ? number
  : D extends Map<infer MK, any>
  ? MK
  : D extends Record<infer R>
  ? keyof R
  : never;

export type ValOf<D, K = KeyOf<D>> = D extends List<infer L>
  ? L
  : D extends Map<K, infer M>
  ? M
  : D extends Record<infer R>
  ? K extends keyof R
    ? R[K]
    : never
  : never;

export type KeyPath<
  D,
  K1 = KeyOf<D>, //
  K2 = KeyOf<ValOf<D>>,
  K3 = KeyOf<ValOf<ValOf<D>>>,
  K4 = KeyOf<ValOf<ValOf<ValOf<D>>>>,
  K5 = KeyOf<ValOf<ValOf<ValOf<ValOf<D>>>>>,
  K6 = KeyOf<ValOf<ValOf<ValOf<ValOf<ValOf<D>>>>>>,
  K7 = KeyOf<ValOf<ValOf<ValOf<ValOf<ValOf<ValOf<D>>>>>>>,
  K8 = KeyOf<ValOf<ValOf<ValOf<ValOf<ValOf<ValOf<ValOf<D>>>>>>>>,
  K9 = KeyOf<ValOf<ValOf<ValOf<ValOf<ValOf<ValOf<ValOf<ValOf<D>>>>>>>>>
> =
  | [] //
  | [K1] //
  | [K1, K2]
  | [K1, K2, K3]
  | [K1, K2, K3, K4]
  | [K1, K2, K3, K4, K5]
  | [K1, K2, K3, K4, K5, K6]
  | [K1, K2, K3, K4, K5, K6, K7]
  | [K1, K2, K3, K4, K5, K6, K7, K8]
  | [K1, K2, K3, K4, K5, K6, K7, K8, K9];

export type ValPath<D, KS = KeyPath<D>> = KS extends []
  ? D //
  : KS extends [infer K1]
  ? ValOf<D, K1>
  : KS extends [infer K1, infer K2]
  ? ValOf<ValOf<D, K1>, K2>
  : KS extends [infer K1, infer K2, infer K3]
  ? ValOf<ValOf<ValOf<D, K1>, K2>, K3>
  : KS extends [infer K1, infer K2, infer K3, infer K4]
  ? ValOf<ValOf<ValOf<ValOf<D, K1>, K2>, K3>, K4>
  : KS extends [infer K1, infer K2, infer K3, infer K4, infer K5]
  ? ValOf<ValOf<ValOf<ValOf<ValOf<D, K1>, K2>, K3>, K4>, K5>
  : KS extends [infer K1, infer K2, infer K3, infer K4, infer K5, infer K6]
  ? ValOf<ValOf<ValOf<ValOf<ValOf<ValOf<D, K1>, K2>, K3>, K4>, K5>, K6>
  : KS extends [
      infer K1,
      infer K2,
      infer K3,
      infer K4,
      infer K5,
      infer K6,
      infer K7
    ]
  ? ValOf<
      ValOf<ValOf<ValOf<ValOf<ValOf<ValOf<D, K1>, K2>, K3>, K4>, K5>, K6>,
      K7
    >
  : KS extends [
      infer K1,
      infer K2,
      infer K3,
      infer K4,
      infer K5,
      infer K6,
      infer K7,
      infer K8
    ]
  ? ValOf<
      ValOf<
        ValOf<ValOf<ValOf<ValOf<ValOf<ValOf<D, K1>, K2>, K3>, K4>, K5>, K6>,
        K7
      >,
      K8
    >
  : KS extends [
      infer K1,
      infer K2,
      infer K3,
      infer K4,
      infer K5,
      infer K6,
      infer K7,
      infer K8,
      infer K9
    ]
  ? ValOf<
      ValOf<
        ValOf<
          ValOf<ValOf<ValOf<ValOf<ValOf<ValOf<D, K1>, K2>, K3>, K4>, K5>, K6>,
          K7
        >,
        K8
      >,
      K9
    >
  : never;

export type GetState<T> = <KS extends KeyPath<T>>(
  keyPath: KS
) => ValPath<T, KS>;
export type Dispatch<T> = <KS extends KeyPath<T>>(
  keyPath: KS,
  value: ValPath<T, KS>
) => void;
export type Hooker<T> = <KS extends KeyPath<T>>(
  ...keyPath: KS
) => [ValPath<T, KS>, (value: ValPath<T, KS>) => void];
export type Hook<D> = [D, (value: D) => void];
