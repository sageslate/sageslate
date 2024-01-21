import type { Models } from './models.js'
import type { ConfigurationToolkit } from '../utils/configuration.js'
import type { UserInfo } from '../utils/jsonWebToken.js'
import type express from 'express'
import type { Collection, Db as Database } from 'mongodb'

export type ConnectedModels = {
  [Key in keyof Models]: Collection<Models[Key]>
}

export type ApolloContext = {
  req?: express.Request
  res?: express.Response
  database: Database
  configuration: ConfigurationToolkit
  models: ConnectedModels
  user?: UserInfo
}
