/**
 * Deeply merge `source` into `target`.
 * - If a key exists in both objects and the values are plain objects → merge recursively.
 * - Otherwise the `source` value overrides the `target` value.
 *
 * @param {Object} target  The object that will receive the merged data
 * @param {Object} source  The object whose properties will be merged into `target`
 * @returns {Object} The mutated `target` (and also returned for chaining)
 */
export default function mergeDeep<T extends Record<string, unknown>, U extends Record<string, unknown>>(
  target: T,
  source: U
): T & U {
  // If either value is not an object (e.g. null, array, function…) just copy it
  if (typeof source !== 'object' || source === null) {
    return source as unknown as T & U
  }

  // Ensure target is an object
  if (typeof target !== 'object' || target === null) {
    target = {} as T
  }

  // Iterate over all keys of the source object
  for (const key of Object.keys(source)) {
    const srcVal = source[key]
    const tgtVal = target[key]

    // If both source and target values are plain objects → merge recursively
    if (typeof srcVal === 'object' && srcVal !== null && typeof tgtVal === 'object' && tgtVal !== null) {
      ;(target as any)[key] = mergeDeep(tgtVal as Record<string, unknown>, srcVal as Record<string, unknown>)
    } else if (
      tgtVal !== undefined &&
      typeof tgtVal === 'number' &&
      srcVal !== undefined &&
      typeof srcVal === 'number'
    ) {
      ;(target as any)[key] = (tgtVal as number) + (srcVal as number)
    } else if (srcVal !== undefined) {
      // Otherwise overwrite the value

      ;(target as any)[key] = srcVal
    }
  }

  return target as T & U
}
