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
