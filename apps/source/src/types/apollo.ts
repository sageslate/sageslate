import type { ConfigurationToolkit } from '../utils/configuration.js'
import type { Db as Database } from 'mongodb'

export type ApolloContext = {
  database: Database
  configuration: ConfigurationToolkit
}
