import { IsNever, UnionToIntersection } from "./common-utils"
import { SafeMerge } from "./object";

// Хак компилятора
export type LastOf<T> =
    UnionToIntersection<T extends unknown ? () => T : never> extends () => (infer R) ? R : never


export type TuplifyUnion<T, L = LastOf<T>> =
    IsNever<T> extends true ? []
    : [...TuplifyUnion<Exclude<T, L>>, L]

// TuplifyUnion<'a' | 'b' | 'c'>; // ["a", "b", "c"]     


export type SafeMergeTuple<
    T extends unknown[],
    M extends {} = {},
> = T extends [infer F, ...infer R]
    ? SafeMergeTuple<R, SafeMerge<M, F>>
    : M;


export type BuildTuple<T extends number = 0, Acc extends unknown[] = []> =
    Acc['length'] extends T ? Acc : BuildTuple<T, [unknown, ...Acc]>    