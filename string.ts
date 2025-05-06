import { BuildTuple } from "./tuple";

export type NotEmptyString = `${any}${string}`;
export type SplitByDot<T> = T extends `${infer FirstSymbol}.${infer Rest}`
    ? [FirstSymbol, Rest]
    : `Not match`;

export type SplitBy<T, Pattern extends string = ''> =
    T extends `${infer FirstPart}${Pattern}${infer Rest}`
    ? [FirstPart, ...SplitBy<Rest, Pattern>]
    : [T];

export type StringReverse<T> = T extends `${infer FirstLetter}${infer Rest}`
    ? `${StringReverse<Rest>}${FirstLetter}`
    : T;

export type SnakeCase<S extends string> = S extends `${infer FirstLetter}${infer Rest}` ?
    Rest extends Uncapitalize<Rest>
    ? `${Lowercase<FirstLetter>}${SnakeCase<Rest>}` : `${Lowercase<FirstLetter>}_${SnakeCase<Rest>}`
    : S

export type ReplaceAll<Str, Pattern, NewValue> = Str extends `${infer Left}${Pattern &
    string}${infer Right}`
    ? `${Left}${NewValue & string}${ReplaceAll<Right, Pattern, NewValue>}`
    : Str;

export type StringToTuple<T extends string> = T extends `${infer Letter}${infer Rest}`
    ? [Letter, ...StringToTuple<Rest>]
    : []


export type MaxLengthString<T extends string = '', Limit extends number = 5> =
    T & (StringToTuple<T> extends [...BuildTuple<Limit>, ...infer Rest]
        ? Rest['length'] extends 0
        ? unknown
        : never
        : unknown)
