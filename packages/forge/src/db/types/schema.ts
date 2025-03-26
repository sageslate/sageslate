import type { JsonValue } from 'type-fest'

declare const $valuesKey: unique symbol
declare const $sublevelsKey: unique symbol

export type Schema<
  Values extends Record<string, JsonValue>,
  Sublevels extends Record<string, Schema<any, any>> | void = void,
> = {
  [$valuesKey]: Values
  [$sublevelsKey]: Sublevels
}

export type ValuesOfSchema<SchemaType> = SchemaType extends Schema<infer Values, any> ? Values : never
export type SublevelsOfSchema<SchemaType> = SchemaType extends Schema<any, infer Sublevels> ? Sublevels : never
