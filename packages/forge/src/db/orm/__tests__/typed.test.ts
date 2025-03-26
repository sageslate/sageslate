import { resolve } from 'node:path'

import { ClassicLevel } from 'classic-level'
import { mkdirp, remove } from 'fs-extra'
import { afterAll, assertType, beforeAll, describe, expect, test } from 'vitest'

import { TypedLevel } from '../typed.js'

import type { AnyLevel } from '../../types/orm.js'
import type { Schema } from '../../types/schema.js'

const test_db_folder = resolve(import.meta.dirname, '../../../../.test_db/typed')

describe('TypedLevel', () => {
  beforeAll(async () => {
    await mkdirp(test_db_folder)
  })

  test('should pass db status', async () => {
    const level = new ClassicLevel(resolve(test_db_folder, 'typed_level_status'), { valueEncoding: 'json' })
    const typedLevel = new TypedLevel<
      Schema<{
        value: string
      }>
    >(level as any as AnyLevel)

    expect(typedLevel.status).toBe('opening')
    assertType<'opening' | 'open' | 'closing' | 'closed'>(typedLevel.status)

    await level.open()

    expect(typedLevel.status).toBe('open')
  })

  test('should safely get the value', async () => {
    const level = new ClassicLevel(resolve(test_db_folder, 'typed_level_get'), { valueEncoding: 'json' })
    const typedLevel = new TypedLevel<
      Schema<{
        value: string[]
      }>
    >(level as any as AnyLevel)

    const initialValue = await typedLevel.get('value')
    expect(initialValue).toBeUndefined()

    await typedLevel.put('value', ['hello', 'world'])

    const savedValue = await typedLevel.get('value')
    expect(savedValue).toEqual(['hello', 'world'])

    assertType<string[] | undefined>(savedValue)
  })

  test('should get multiple values with getMany', async () => {
    const level = new ClassicLevel(resolve(test_db_folder, 'typed_level_getMany'), { valueEncoding: 'json' })
    const typedLevel = new TypedLevel<
      Schema<{
        key1: string
        key2: number
        key3: boolean
        key4: Array<string>
        key5: { nested: string }
        key6: number | null
      }>
    >(level as any as AnyLevel)

    await typedLevel.put('key1', 'value1')
    await typedLevel.put('key2', 42)
    await typedLevel.put('key3', true)
    await typedLevel.put('key4', ['a', 'b', 'c'])
    await typedLevel.put('key5', { nested: 'object' })
    await typedLevel.put('key6', 100)

    const [val1, val2] = await typedLevel.getMany(['key1', 'key2'])
    expect(val1).toBe('value1')
    expect(val2).toBe(42)
    assertType<string | undefined>(val1)
    assertType<number | undefined>(val2)

    const [val1_3, val2_3, val3_3] = await typedLevel.getMany(['key1', 'key2', 'key3'])
    expect(val1_3).toBe('value1')
    expect(val2_3).toBe(42)
    expect(val3_3).toBe(true)

    const [v1, v2, v3, v4, v5, v6] = await typedLevel.getMany(['key1', 'key2', 'key3', 'key4', 'key5', 'key6'])
    expect(v1).toBe('value1')
    expect(v2).toBe(42)
    expect(v3).toBe(true)
    expect(v4).toEqual(['a', 'b', 'c'])
    expect(v5).toEqual({ nested: 'object' })
    expect(v6).toBe(100)
  })

  test('should delete values with del', async () => {
    const level = new ClassicLevel(resolve(test_db_folder, 'typed_level_del'), { valueEncoding: 'json' })
    const typedLevel = new TypedLevel<
      Schema<{
        deleteMe: string
      }>
    >(level as any as AnyLevel)

    await typedLevel.put('deleteMe', 'temporary value')

    const beforeDelete = await typedLevel.get('deleteMe')
    expect(beforeDelete).toBe('temporary value')

    await typedLevel.del('deleteMe')

    const afterDelete = await typedLevel.get('deleteMe')
    expect(afterDelete).toBeUndefined()
  })

  test('should handle batch operations array', async () => {
    const level = new ClassicLevel(resolve(test_db_folder, 'typed_level_batch_array'), { valueEncoding: 'json' })
    const typedLevel = new TypedLevel<
      Schema<{
        batchKey1: string
        batchKey2: number
        batchKey3: boolean
      }>
    >(level as any as AnyLevel)

    await typedLevel.batch([
      { type: 'put', key: 'batchKey1', value: 'batch value 1' },
      { type: 'put', key: 'batchKey2', value: 123 },
      { type: 'put', key: 'batchKey3', value: true },
    ])

    const [val1, val2, val3] = await typedLevel.getMany(['batchKey1', 'batchKey2', 'batchKey3'])
    expect(val1).toBe('batch value 1')
    expect(val2).toBe(123)
    expect(val3).toBe(true)

    await typedLevel.batch([{ type: 'del', key: 'batchKey2' }])

    const afterDelete = await typedLevel.get('batchKey2')
    expect(afterDelete).toBeUndefined()
  })

  test('should handle chained batch operations', async () => {
    const level = new ClassicLevel(resolve(test_db_folder, 'typed_level_batch_chained'), { valueEncoding: 'json' })
    const typedLevel = new TypedLevel<
      Schema<{
        chainKey1: string
        chainKey2: number
        chainKey3: boolean
      }>
    >(level as any as AnyLevel)

    await level.open()

    const batch = await typedLevel.batch()
    batch.put('chainKey1', 'chain value 1').put('chainKey2', 456).put('chainKey3', false)

    await batch.write()

    const [val1, val2, val3] = await typedLevel.getMany(['chainKey1', 'chainKey2', 'chainKey3'])
    expect(val1).toBe('chain value 1')
    expect(val2).toBe(456)
    expect(val3).toBe(false)

    const deleteBatch = await typedLevel.batch()
    deleteBatch.del('chainKey3')
    await deleteBatch.write()

    const afterDelete = await typedLevel.get('chainKey3')
    expect(afterDelete).toBeUndefined()
  })

  test('should iterate through entries with iterator', async () => {
    const level = new ClassicLevel(resolve(test_db_folder, 'typed_level_iterator'), { valueEncoding: 'json' })
    const typedLevel = new TypedLevel<
      Schema<{
        iter1: string
        iter2: string
        iter3: string
      }>
    >(level as any as AnyLevel)

    await typedLevel.batch([
      { type: 'put', key: 'iter1', value: 'first' },
      { type: 'put', key: 'iter2', value: 'second' },
      { type: 'put', key: 'iter3', value: 'third' },
    ])

    const iterator = typedLevel.iterator()
    const entries = []

    for await (const entry of iterator) {
      entries.push(entry)
    }

    expect(entries.length).toBe(3)
    expect(entries).toContainEqual(['iter1', 'first'])
    expect(entries).toContainEqual(['iter2', 'second'])
    expect(entries).toContainEqual(['iter3', 'third'])
  })

  test('should iterate through keys with keys()', async () => {
    const level = new ClassicLevel(resolve(test_db_folder, 'typed_level_keys'), { valueEncoding: 'json' })
    const typedLevel = new TypedLevel<
      Schema<{
        key_a: string
        key_b: string
        key_c: string
      }>
    >(level as any as AnyLevel)

    await typedLevel.batch([
      { type: 'put', key: 'key_a', value: 'value_a' },
      { type: 'put', key: 'key_b', value: 'value_b' },
      { type: 'put', key: 'key_c', value: 'value_c' },
    ])

    const keyIterator = typedLevel.keys()
    const keys = []

    for await (const key of keyIterator) {
      keys.push(key)
    }

    expect(keys.length).toBe(3)
    expect(keys).toContain('key_a')
    expect(keys).toContain('key_b')
    expect(keys).toContain('key_c')
  })

  test('should iterate through values with values()', async () => {
    const level = new ClassicLevel(resolve(test_db_folder, 'typed_level_values'), { valueEncoding: 'json' })
    const typedLevel = new TypedLevel<
      Schema<{
        val_a: string
        val_b: string
        val_c: string
      }>
    >(level as any as AnyLevel)

    await typedLevel.batch([
      { type: 'put', key: 'val_a', value: 'content_a' },
      { type: 'put', key: 'val_b', value: 'content_b' },
      { type: 'put', key: 'val_c', value: 'content_c' },
    ])

    const valueIterator = typedLevel.values()
    const values = []

    for await (const value of valueIterator) {
      values.push(value)
    }

    expect(values.length).toBe(3)
    expect(values).toContain('content_a')
    expect(values).toContain('content_b')
    expect(values).toContain('content_c')
  })

  test('should clear all entries', async () => {
    const level = new ClassicLevel(resolve(test_db_folder, 'typed_level_clear'), { valueEncoding: 'json' })
    const typedLevel = new TypedLevel<
      Schema<{
        clear1: string
        clear2: string
        clear3: string
      }>
    >(level as any as AnyLevel)

    await typedLevel.batch([
      { type: 'put', key: 'clear1', value: 'to be cleared 1' },
      { type: 'put', key: 'clear2', value: 'to be cleared 2' },
      { type: 'put', key: 'clear3', value: 'to be cleared 3' },
    ])

    const beforeClear = await typedLevel.get('clear1')
    expect(beforeClear).toBe('to be cleared 1')

    await typedLevel.clear()

    const afterClear1 = await typedLevel.get('clear1')
    const afterClear2 = await typedLevel.get('clear2')
    const afterClear3 = await typedLevel.get('clear3')

    expect(afterClear1).toBeUndefined()
    expect(afterClear2).toBeUndefined()
    expect(afterClear3).toBeUndefined()
  })

  test('should handle sublevels', async () => {
    const level = new ClassicLevel(resolve(test_db_folder, 'typed_level_sublevel'), { valueEncoding: 'json' })

    type TestSchema = Schema<
      {
        rootKey: string
      },
      {
        users: Schema<{
          user1: { name: string; age: number }
          user2: { name: string; age: number }
        }>
        settings: Schema<{
          theme: string
          notifications: boolean
        }>
      }
    >

    const typedLevel = new TypedLevel<TestSchema>(level as any as AnyLevel)

    await typedLevel.put('rootKey', 'root value')

    const usersLevel = typedLevel.sublevel('users')
    await usersLevel.put('user1', { name: 'Alice', age: 30 })
    await usersLevel.put('user2', { name: 'Bob', age: 25 })

    const settingsLevel = typedLevel.sublevel('settings')
    await settingsLevel.put('theme', 'dark')
    await settingsLevel.put('notifications', true)

    const rootValue = await typedLevel.get('rootKey')
    expect(rootValue).toBe('root value')

    const user1 = await usersLevel.get('user1')
    expect(user1).toEqual({ name: 'Alice', age: 30 })
    assertType<{ name: string; age: number } | undefined>(user1)

    const [theme, notifications] = await settingsLevel.getMany(['theme', 'notifications'])
    expect(theme).toBe('dark')
    expect(notifications).toBe(true)
  })

  afterAll(async () => {
    await remove(test_db_folder)
  })
})
