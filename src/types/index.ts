/**
 * TOV - Type Of Value
 *
 * Extracts the type of the value of an object
 *
 * @typeParam T - The object to extract the value type from
 * @example
 * const someEnum = \{
 *  a: 1,
 *  b: 2,
 *  c: 3
 * \} as const;
 *
 * type SomeEnumType = TOV<typeof someEnum> // 1 | 2 | 3
 */
export type TOV<T> = T extends { [key: string]: infer U } ? U : never

/**
 * ExtractEnumValues
 *
 * Extracts the values of an enum
 *
 * @typeParam T - The enum to extract the values from
 *
 * @example
 *
 * enum SomeEnum \{
 * a = 1,
 * b = 2,
 * c = 3
 * \}
 *
 * type SomeEnumValues = ExtractEnumValues<typeof SomeEnum> // 1 | 2 | 3
 */
export type ExtractEnumValues<T> = T[keyof T]

/**
 * ExtractFunctionReturnType
 *
 * Extracts the return type of a function
 *
 * @typeParam T - The function to extract the return type from
 *
 * @example
 *
 * const someFunction = () => 1;
 *
 * type SomeFunctionReturnType = ExtractFunctionReturnType<typeof someFunction> // number
 *
 */
export type ExtractFunctionReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : never

/**
 * ExtractFunctionParameters
 *
 * Extracts the parameters of a function
 *
 * @typeParam T - The function to extract the parameters from
 *
 * @example
 * const someFunction = (a: number, b: string) => a + b;
 *
 * type SomeFunctionParameters = ExtractFunctionParameters<typeof someFunction> // [number, string]
 *
 */
export type ExtractFunctionParameters<T> = T extends (...args: infer P) => unknown
  ? P
  : never

/**
 * ExtractAwaited
 *
 * Extracts the awaited value of a promise
 *
 * @typeParam T - The promise to extract the awaited value from
 *
 * @example
 *
 * const somePromise = Promise.resolve(\{
 *  id: '123',
 *  name: 'John',
 *  email: 'john@example.com',
 * \});
 *
 * type SomePromiseValue = ExtractAwaited<typeof somePromise>
 * \{
 *  id: string;
 *  name: string;
 *  email: string;
 *  \}
 */
export type ExtractAwaited<T extends (...args: unknown[]) => unknown> =
  ReturnType<T> extends Promise<infer U> ? U : never

/**
 * RemoveIndexSignature
 *
 * Removes the index signature from an object
 *
 * @typeParam T - The object to remove the index signature from
 *
 * @example
 * type SomeObject = \{
 * a: 1,
 * b: 2,
 * c: 3,
 * \} & \{
 * \[key: string\]: any;
 * \}
 *
 * type SomeObjectWithoutIndexSignature = RemoveIndexSignature<SomeObject> // \{ a: 1, b: 2, c: 3 \}
 */
export type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
}

/**
 * RemoveOptional
 *
 * Removes the optional modifier from an object
 *
 * @typeParam T - The object to remove the optional modifier from
 *
 * @example
 * type SomeObject = \{
 * a?: number;
 * b?: string;
 * c?: boolean;
 * \}
 *
 * type SomeObjectWithoutOptional = RemoveOptional<SomeObject> // \{ a: number; b: string; c: boolean; \}
 */
export type RemoveOptional<T> = {
  [K in keyof T]-?: T[K]
}

/**
 * MergeTwoTypes
 *
 * Merges two types into one
 *
 * @typeParam A - The first type to merge
 * @typeParam B - The second type to merge
 *
 * @example
 * type A = \{
 * a: string;
 * b: string;
 * \}
 *
 * type B = \{
 * c: number;
 * d: number;
 * \}
 *
 * type Merged = MergeTwoTypes<A, B> // \{ a: string; b: string; c: number; d: number; \}
 */
export type MergeTwoTypes<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A ? A[K] : K extends keyof B ? B[K] : never
}

/**
 * MergeTypes
 *
 * Merges all types in a tuple into one
 *
 * @typeParam T - The tuple of types to merge
 *
 * @example
 * type A = \{
 * a: string;
 * b: string;
 * \}
 *
 * type B = \{
 * c: boolean;
 * d: boolean;
 * \}
 *
 * type C = \{
 * e: number;
 * f: number;
 * \}
 *
 * type Merged = MergeTypes<[A, B, C]> // \{ a: string; b: string; c: boolean; d: boolean; e: number; f: number; \}
 */
export type MergeTypes<T extends unknown[]> = T extends [infer A, infer B, ...infer R]
  ? MergeTypes<[MergeTwoTypes<A, B>, ...R]>
  : T extends [infer A]
    ? A
    : never

/**
 * LiteralUnion
 *
 * Allows to create a union type from string literals
 *
 * @typeParam T - The string literals to create the union from
 *
 * @example
 * type SomeString = 'a' | 'b' | 'c';
 * type SomeNumber = 1 | 2 | 3;
 *
 * type SomeUnion = LiteralUnion<SomeString | SomeNumber> // 'a' | 'b' | 'c' | 1 | 2 | 3
 */
export type LiteralUnion<T extends U, U> = T | (U & object)

/**
 * DeepPartial
 *
 * Makes all properties of an object optional
 *
 * @typeParam T - The object to make partial
 *
 * @example
 *
 * type SomeObject = \{
 * a: \{
 *   b: \{
 *     c: number;
 *   \}
 * \}
 *\}
 *
 * type SomePartial = DeepPartial<SomeObject> // \{
 * a?: \{
 *   b?: \{
 *     c?: number;
 *   \}
 * \}
 *\}
 *
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P]
}

/**
 * DeepReadonly
 * Makes all properties of an object readonly
 * @typeParam T - The object to make readonly
 * @example
 * type SomeObject = \{
 * a: \{
 *  b: \{
 *   c: number;
 * \}
 * \}
 * \}
 * type SomeReadonly = DeepReadonly<SomeObject> // \{
 * readonly a: \{
 *  readonly b: \{
 *      readonly c: number;
 *      \}
 *    \}
 * \}
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

/**
 * DeepRequired
 * Makes all properties of an object required
 * @typeParam T - The object to make required
 * @example
 * type SomePartial = \{
 * a?: \{
 *  b?: \{
 *   c?: number;
 * \}
 * \}
 * \}
 * type SomeRequired = DeepRequired<SomePartial> // \{
 * a: \{
 *  b: \{
 *   c: number;
 * \}
 * \}
 * \}
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends Record<string, unknown> ? DeepRequired<T[P]> : T[P]
}
