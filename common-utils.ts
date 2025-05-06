export type IsAny<T> = 0 extends 1 & T ? true : false;
export type IsNever<T> = [T] extends [never] ? true : false;
export type IsUnknown<T> = (
    unknown extends T
    ? IsAny<T> extends true
    ? false
    : true
    : false
);

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#implicit-index-signatures
// https://github.com/microsoft/TypeScript/issues/15300

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};
export type SimplifyDeep<T> = { [KeyType in keyof T]: SimplifyDeep<T[KeyType]> } & {};


// https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
// https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript/68963796#68963796

export type IsEqual<A, B> =
    (<G>() => G extends A & G | G ? 1 : 2) extends
    (<G>() => G extends B & G | G ? 1 : 2)
    ? true
    : false;


export type IsEqualSimplify<A, B, C = Simplify<A>, D = Simplify<B>> =
    (<G>() => G extends C & G | G ? 1 : 2) extends
    (<G>() => G extends D & G | G ? 1 : 2)
    ? true
    : false;

// NOTE! - если есть пересечение то может потребоваться Simplify

// type T1 = {
//     name: string
//     value: string
// }

// type T2 = {
//     name: string
// } & {
//     value: string
// }

// type R = IsEqual<T1, T2> // false
// //   ^?
// type R1 = IsEqualSimplify<T1, T2>  // true


declare const brandSymbol: unique symbol;

export type Brand<T, K extends string> = T & { __brand: K }
// type Brand<T, K extends string> = T & {[brandSymbol]: K} // или так

// type UserId = Brand<string, 'userId'>
// type PostId = Brand<string, 'postId'>

// function createUserId(): UserId {
//     return crypto.randomUUID() as UserId;
// }
// function createPostId(): PostId {
//     return crypto.randomUUID() as PostId;
// }

// function findUserById(userId: UserId){}

// const id = createUserId();
// const id2 = createPostId();

// findUserById(id)

export type Maybe<T> = Nullable<T> | undefined;

export type MaybeFn<T> = T | (() => T);

export type Nullable<T> = T | null;

export type MaybeFalsy<T> = Maybe<T> | '' | false | 0;

export type AnyPrimitive = string | number | boolean | null | undefined;




// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types
export type UnionToIntersection<Union> = (
    Union extends unknown
    ? (distributedUnion: Union) => void
    : never
) extends ((mergedIntersection: infer Intersection) => void)
    ? Intersection
    : never;


export type R = UnionToIntersection<{ name: string } | { a: string } | { value: string }>