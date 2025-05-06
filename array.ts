export type AnyArray = readonly unknown[]
export type IsTuple<T> = T extends [] | [unknown, ...unknown[]] ? true : false // чтобы отличать массив от тапла

export type Push<T, K> = T extends AnyArray ? [...T, K] : T;
export type Concat<T extends AnyArray, B extends AnyArray> = [...T, ...B]

export type Shift<T> = T extends readonly [unknown, ...args: infer R] ? R : never
export type Pop<T> = T extends [...args: infer R, unknown] ? R : never
export type Unshift<A extends AnyArray, T> = [T, ...A]
