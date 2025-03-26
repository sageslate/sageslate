import type {
  AnyLevel,
  TypedBatchOperation,
  TypedChainedBatch,
  TypedIterator,
  TypedKeyIterator,
  TypedValueIterator,
} from '../types/orm.js'
import type { Schema, SublevelsOfSchema, ValuesOfSchema } from '../types/schema.js'
import type { AbstractBatchOperation } from 'abstract-level'
import type { RangeOptions } from 'abstract-level/types/interfaces.js'
import type { JsonValue } from 'type-fest'

export class TypedLevel<LevelSchema extends Schema<any, any>> {
  level: AnyLevel

  constructor(level: AnyLevel) {
    this.level = level
  }

  get status(): 'opening' | 'open' | 'closing' | 'closed' {
    return this.level.status
  }

  get<Key extends keyof ValuesOfSchema<LevelSchema>>(key: Key): Promise<ValuesOfSchema<LevelSchema>[Key] | undefined> {
    return this.level.get(key as string)
  }

  getMany<Key1 extends keyof ValuesOfSchema<LevelSchema>, Key2 extends keyof ValuesOfSchema<LevelSchema>>(
    keys: [Key1, Key2],
  ): Promise<[ValuesOfSchema<LevelSchema>[Key1] | undefined, ValuesOfSchema<LevelSchema>[Key2] | undefined]>
  getMany<
    Key1 extends keyof ValuesOfSchema<LevelSchema>,
    Key2 extends keyof ValuesOfSchema<LevelSchema>,
    Key3 extends keyof ValuesOfSchema<LevelSchema>,
  >(
    keys: [Key1, Key2, Key3],
  ): Promise<
    [
      ValuesOfSchema<LevelSchema>[Key1] | undefined,
      ValuesOfSchema<LevelSchema>[Key2] | undefined,
      ValuesOfSchema<LevelSchema>[Key3] | undefined,
    ]
  >
  getMany<
    Key1 extends keyof ValuesOfSchema<LevelSchema>,
    Key2 extends keyof ValuesOfSchema<LevelSchema>,
    Key3 extends keyof ValuesOfSchema<LevelSchema>,
    Key4 extends keyof ValuesOfSchema<LevelSchema>,
  >(
    keys: [Key1, Key2, Key3, Key4],
  ): Promise<
    [
      ValuesOfSchema<LevelSchema>[Key1] | undefined,
      ValuesOfSchema<LevelSchema>[Key2] | undefined,
      ValuesOfSchema<LevelSchema>[Key3] | undefined,
      ValuesOfSchema<LevelSchema>[Key4] | undefined,
    ]
  >
  getMany<
    Key1 extends keyof ValuesOfSchema<LevelSchema>,
    Key2 extends keyof ValuesOfSchema<LevelSchema>,
    Key3 extends keyof ValuesOfSchema<LevelSchema>,
    Key4 extends keyof ValuesOfSchema<LevelSchema>,
    Key5 extends keyof ValuesOfSchema<LevelSchema>,
  >(
    keys: [Key1, Key2, Key3, Key4, Key5],
  ): Promise<
    [
      ValuesOfSchema<LevelSchema>[Key1] | undefined,
      ValuesOfSchema<LevelSchema>[Key2] | undefined,
      ValuesOfSchema<LevelSchema>[Key3] | undefined,
      ValuesOfSchema<LevelSchema>[Key4] | undefined,
      ValuesOfSchema<LevelSchema>[Key5] | undefined,
    ]
  >
  getMany<
    Key1 extends keyof ValuesOfSchema<LevelSchema>,
    Key2 extends keyof ValuesOfSchema<LevelSchema>,
    Key3 extends keyof ValuesOfSchema<LevelSchema>,
    Key4 extends keyof ValuesOfSchema<LevelSchema>,
    Key5 extends keyof ValuesOfSchema<LevelSchema>,
    Key6 extends keyof ValuesOfSchema<LevelSchema>,
  >(
    keys: [Key1, Key2, Key3, Key4, Key5, Key6],
  ): Promise<
    [
      ValuesOfSchema<LevelSchema>[Key1] | undefined,
      ValuesOfSchema<LevelSchema>[Key2] | undefined,
      ValuesOfSchema<LevelSchema>[Key3] | undefined,
      ValuesOfSchema<LevelSchema>[Key4] | undefined,
      ValuesOfSchema<LevelSchema>[Key5] | undefined,
      ValuesOfSchema<LevelSchema>[Key6] | undefined,
    ]
  >
  getMany(keys: string[]): Promise<(ValuesOfSchema<LevelSchema>[keyof ValuesOfSchema<LevelSchema>] | undefined)[]> {
    return this.level.getMany(keys)
  }

  put<Key extends keyof ValuesOfSchema<LevelSchema>>(key: Key, value: ValuesOfSchema<LevelSchema>[Key]): Promise<void> {
    return this.level.put(key as string, value)
  }

  del(key: keyof ValuesOfSchema<LevelSchema>): Promise<void> {
    return this.level.del(key as string)
  }

  batch(operations: TypedBatchOperation<LevelSchema>[]): Promise<void>
  batch(): Promise<TypedChainedBatch<LevelSchema>>
  batch(operations?: any): any {
    if (operations) return this.level.batch(operations as AbstractBatchOperation<AnyLevel, string, JsonValue>[])
    return this.level.batch()
  }

  iterator(): TypedIterator<LevelSchema> {
    return this.level.iterator() as any as TypedIterator<LevelSchema>
  }

  keys(): TypedKeyIterator<LevelSchema> {
    return this.level.keys() as any as TypedKeyIterator<LevelSchema>
  }

  values(): TypedValueIterator<LevelSchema> {
    return this.level.values() as any as TypedValueIterator<LevelSchema>
  }

  clear(): Promise<void>
  clear(options: RangeOptions<keyof ValuesOfSchema<LevelSchema>>): Promise<void>
  clear(options?: any): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.level.clear(options)
  }

  sublevel<SublevelKey extends keyof SublevelsOfSchema<LevelSchema>>(
    key: SublevelKey,
  ): TypedLevel<SublevelsOfSchema<LevelSchema>[SublevelKey]> {
    return new TypedLevel(this.level.sublevel(key as string, { valueEncoding: 'json' }) as AnyLevel)
  }
}
