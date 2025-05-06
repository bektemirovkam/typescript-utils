export type Or<T1, T2> = T1 extends true ? true : T2 extends true ? true : false;

export type And<T1, T2> = T1 extends true ? (T2 extends true ? true : false) : false;

export type Not<T> =
    T extends true ? false : true;

export type Xor<T1, T2> =
    T1 extends true
    ? (T2 extends true ? false : true)
    : (T2 extends true ? true : false);


// ===================================

export type IsString<T> = T extends string ? true : false;
export type IsAssignable<T, V> = T extends V ? true : false;

export type Or3<T1, T2, T3> = Or<T1, Or<T2, T3>>

export type CheckKeyStringNotId<T> = And<
    IsString<T>,
    Not<
        Or3<IsAssignable<T, "id">, IsAssignable<T, "slug">, IsAssignable<T, "uuid">>
    >
>;

export type R = CheckKeyStringNotId<number>;
export type R2 = CheckKeyStringNotId<"some-string">; // true
export type R3 = CheckKeyStringNotId<"id">;
export type R4 = CheckKeyStringNotId<"slug">;
export type R5 = CheckKeyStringNotId<"uuid">;


// ===================================

export type WrapNotIdString<T> =
    And<
        IsString<T>,
        Not<
            Or3<
                IsAssignable<T, "id">,
                IsAssignable<T, "slug">,
                IsAssignable<T, "uuid">
            >
        >
    > extends true
    ? `{${T & string}}`
    : T;

export type R6 = WrapNotIdString<"p">;

