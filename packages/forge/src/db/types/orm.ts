import type { Schema, ValuesOfSchema } from './schema.js'
import type { AbstractLevel } from 'abstract-level'
import type { Entries, Entry, JsonValue } from 'type-fest'

export type AnyLevel = AbstractLevel<string | Buffer | Uint8Array, string, JsonValue>

export type TypedBatchPutOperation<LevelSchema extends Schema<any, any>> = {
  [Key in keyof ValuesOfSchema<LevelSchema>]: {
    type: 'put'
    key: Key
    value: ValuesOfSchema<LevelSchema>[Key]
  }
}[keyof ValuesOfSchema<LevelSchema>]

export type TypedBatchDelOperation<LevelSchema extends Schema<any, any>> = {
  [Key in keyof ValuesOfSchema<LevelSchema>]: {
    type: 'del'
    key: Key
  }
}[keyof ValuesOfSchema<LevelSchema>]

export type TypedBatchOperation<LevelSchema extends Schema<any, any>> =
  | TypedBatchPutOperation<LevelSchema>
  | TypedBatchDelOperation<LevelSchema>

export type TypedChainedBatch<LevelSchema extends Schema<any, any>> = {
  put<Key extends keyof ValuesOfSchema<LevelSchema>>(
    key: Key,
    value: ValuesOfSchema<LevelSchema>[Key],
  ): TypedChainedBatch<LevelSchema>
  del(key: keyof ValuesOfSchema<LevelSchema>): TypedChainedBatch<LevelSchema>
  clear(): TypedChainedBatch<LevelSchema>
  write(): Promise<void>
  close(): Promise<void>
}

export type TypedCommonIterator<Type> = {
  get count(): number
  get limit(): number
  [Symbol.asyncIterator](): AsyncGenerator<Type, void, unknown>
  close(): Promise<void>
}

export type TypedAbstractIterator<LevelSchema extends Schema<any, any>> = {
  next(): Promise<Entry<ValuesOfSchema<LevelSchema>> | undefined>
  nextv(size: number): Promise<Entries<ValuesOfSchema<LevelSchema>>>
  all(): Promise<Entries<ValuesOfSchema<LevelSchema>>>
  seek(target: keyof ValuesOfSchema<LevelSchema>): void
}

export type TypedAbstractKeyIterator<LevelSchema extends Schema<any, any>> = {
  next(): Promise<keyof ValuesOfSchema<LevelSchema> | undefined>
  nextv(size: number): Promise<(keyof ValuesOfSchema<LevelSchema>)[]>
  all(): Promise<(keyof ValuesOfSchema<LevelSchema>)[]>
  seek(target: keyof ValuesOfSchema<LevelSchema>): void
}

export type TypedAbstractValueIterator<LevelSchema extends Schema<any, any>> = {
  next(): Promise<ValuesOfSchema<LevelSchema>[keyof ValuesOfSchema<LevelSchema>] | undefined>
  nextv(size: number): Promise<ValuesOfSchema<LevelSchema>[keyof ValuesOfSchema<LevelSchema>][]>
  all(): Promise<ValuesOfSchema<LevelSchema>[keyof ValuesOfSchema<LevelSchema>][]>
  seek(target: keyof ValuesOfSchema<LevelSchema>): void
}

export type TypedIterator<LevelSchema extends Schema<any, any>> = TypedAbstractIterator<LevelSchema> &
  TypedCommonIterator<Entry<ValuesOfSchema<LevelSchema>>>

export type TypedKeyIterator<LevelSchema extends Schema<any, any>> = TypedAbstractKeyIterator<LevelSchema> &
  TypedCommonIterator<keyof ValuesOfSchema<LevelSchema>>

export type TypedValueIterator<LevelSchema extends Schema<any, any>> = TypedAbstractValueIterator<LevelSchema> &
  TypedCommonIterator<ValuesOfSchema<LevelSchema>[keyof ValuesOfSchema<LevelSchema>]>
