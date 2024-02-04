/**
 * isString
 * Check if the value is a string
 *
 * @typeParam T - The value to check
 * @param value - The value to check
 * @returns - True if the value is a string
 * @example
 *
 * const someString = 'hello';
 *
 * if (isString(someString)) \{
 *  console.log('This is a string');
 * \}

 */
export function isString<T>(value: T): boolean {
  return typeof value === 'string'
}

/**
 * isNumber
 * Check if the value is a number
 *
 * @typeParam T - The value to check
 * @param value - The value to check
 *
 * @returns - True if the value is a number
 *
 * @example
 *
 * const someNumber = 1;
 *
 * if (isNumber(someNumber)) \{
 * console.log('This is a number');
 * \}
 *
 */
export function isNumber<T>(value: T): boolean {
  return typeof value === 'number'
}

/**
 * isBoolean
 * Check if the value is a boolean
 *
 * @typeParam T - The value to check
 * @param value - The value to check
 *
 * @returns - True if the value is a boolean
 *
 * @example
 *
 * const someBoolean = true;
 *
 * if (isBoolean(someBoolean)) \{
 * console.log('This is a boolean');
 * \}
 *
 */
export function isBoolean<T>(value: T): boolean {
  return typeof value === 'boolean'
}
