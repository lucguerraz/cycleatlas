/**
 * A tiny, type‑safe helper that returns a *new* value whose object keys
 * (at every level) are sorted alphabetically.
 *
 * It works for plain objects, nested objects, arrays that may contain
 * objects, and any primitive (`string`, `number`, `boolean`, `null`).
 */

export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

export type JsonObject = { [key: string]: JsonValue }
export type JsonArray = JsonValue[]

export default function sortObjectKeys<T extends JsonValue>(data: T): T {
  // Base case – primitives are returned as‑is
  if (data === null || typeof data !== 'object') {
    return data
  }

  // Arrays – map each element recursively
  if (Array.isArray(data)) {
    // TypeScript can't infer that `data` is an array of JsonValue,
    // but we explicitly cast the result back to `T`.
    return data.map(sortObjectKeys) as unknown as T
  }

  // Plain object – sort its keys alphabetically
  const sortedKeys = Object.keys(data).sort() // default: Unicode order
  const result: JsonObject = {}

  for (const key of sortedKeys) {
    // Recurse into the value – it might be an object, array, or primitive
    const value = (data as JsonObject)[key] as JsonValue
    result[key] = sortObjectKeys(value) as JsonValue
  }

  // We know `result` is a `JsonObject`, but we cast it back to the
  // original type `T` to keep the signature intact.
  return result as unknown as T
}
