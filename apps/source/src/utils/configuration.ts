import { randomBytes } from 'node:crypto'

import { Errors } from '@sageslate/stone'
import { hash } from 'bcrypt'

import type { Db as Database } from 'mongodb'

export type Configuration = {
  adminPassword: string
  databaseVersion: number
  jsonWebTokenSecret: string
}
export type ConfigurationDocument = {
  [Key in keyof Configuration]: {
    key: Key
    value: Configuration[Key]
  }
}[keyof Configuration]

export function configurationToolkit(database: Database) {
  async function set<Key extends keyof Configuration>(key: Key, value: Configuration[Key]) {
    const configurationCollection = database.collection('configuration')
    const existingValue = await configurationCollection.findOne({ key })
    await (existingValue
      ? configurationCollection.updateOne({ key }, { $set: { value } })
      : configurationCollection.insertOne({ key, value }))
  }
  async function get<Key extends keyof Configuration>(key: Key): Promise<Configuration[Key]> {
    const configurationCollection = database.collection('configuration')
    const value = await configurationCollection.findOne({ key })
    if (!value) {
      throw new Errors.AppNotInitialized()
    }
    return value.value as Configuration[Key]
  }

  async function isInitialized() {
    return database.listCollections({ name: 'configuration' }).hasNext()
  }
  async function initialize(adminPassword: string) {
    const isInitialized = await database.listCollections({ name: 'configuration' }).hasNext()
    if (isInitialized) {
      throw new Errors.AppAlreadyInitialized()
    }

    await set('adminPassword', await hash(adminPassword, 10))
    await set('databaseVersion', 1)

    const secret = randomBytes(32).toString('hex')
    await set('jsonWebTokenSecret', secret)
  }

  return {
    set,
    get,
    isInitialized,
    initialize,
  }
}

export type ConfigurationToolkit = ReturnType<typeof configurationToolkit>
