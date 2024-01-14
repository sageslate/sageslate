import type { Db as Database } from 'mongodb'

export type ApolloContext = {
  database: Database
}
