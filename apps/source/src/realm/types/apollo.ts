import type { Models as CoreModels } from '../../types/models.js'
import type { ConfigurationToolkit } from '../../utils/configuration.js'
import type { UserInfo } from '../../utils/jsonWebToken.js'
import type express from 'express'
import type { Collection, Db as Database } from 'mongodb'

export type ConnectedCoreModels = {
  [Key in keyof CoreModels]: Collection<CoreModels[Key]>
}

export type ApolloContext = {
  req?: express.Request
  res?: express.Response
  database: Database
  configuration: ConfigurationToolkit
  coreModels: ConnectedCoreModels
  user?: UserInfo
}
