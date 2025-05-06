import { IsEqual } from "./common-utils";

export type AnyObject = Record<string, any>;

export type EmptyObject = Record<string, never>;

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;


export type AllPropertiesOptional<T> = keyof T extends never
  ? true
  : {
    [K in keyof T]-?: undefined extends T[K] ? never : K;
  } extends { [K in keyof T]: never }
  ? true
  : false;


// ======== keys of =====

export type RequiredKeysOf<BaseType extends object> = Exclude<{
  [Key in keyof BaseType]: BaseType extends Record<Key, BaseType[Key]>
  ? Key
  : never
}[keyof BaseType], undefined>;

export type OptionalKeysOf<BaseType extends object> = Exclude<{
  [Key in keyof BaseType]: BaseType extends Record<Key, BaseType[Key]>
  ? never
  : Key
}[keyof BaseType], undefined>;

export type ReadonlyKeysOf<T> = NonNullable<{
  [P in keyof T]: IsEqual<{ [Q in P]: T[P] }, { readonly [Q in P]: T[P] }> extends true ? P : never
}[keyof T]>;

export type WritableKeysOf<T> = NonNullable<{
  [P in keyof T]: IsEqual<{ [Q in P]: T[P] }, { readonly [Q in P]: T[P] }> extends false ? P : never
}[keyof T]>;




export type SafeMerge<First, Second> = {
  [K in keyof (First & Second)]: K extends keyof Second
  ? Second[K]
  : K extends keyof First
  ? First[K]
  : never;
};