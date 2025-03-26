import type { Realm } from './models/realm.js'
import type { Schema } from '../../types/schema.js'

export type CoreSchema = Schema<{
  adminPassword: string
  realms: Realm[]
}>
