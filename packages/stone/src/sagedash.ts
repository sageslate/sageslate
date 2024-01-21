/**
 * Asserts if a value is neither null nor undefined.
 *
 * @param value - The value to check.
 * @returns True if not null/undefined, false otherwise.
 */
export function doesExist<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}

/**
 * Asserts if a value is null or undefined.
 *
 * @param value - The value to check.
 * @returns True if null/undefined, false otherwise.
 */
export function doesNotExist(value: unknown): value is null | undefined {
  return !doesExist(value)
}

/**
 * Asserts if a value is a valid object.
 *
 * @param value - The value to check.
 * @returns True if a valid object, false otherwise.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
