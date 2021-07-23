/**
 * Returns true if the object is a function.
 * @param value The value to check
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}
