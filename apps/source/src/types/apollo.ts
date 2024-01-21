import type { ConfigurationToolkit } from '../utils/configuration.js'
import type express from 'express'
import type { Db as Database } from 'mongodb'

export type ApolloContext = {
  req?: express.Request
  res?: express.Response
  database: Database
  configuration: ConfigurationToolkit
}
