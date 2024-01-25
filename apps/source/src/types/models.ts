import type { ObjectId } from 'mongodb'

export type ModelBase = {
  _id: ObjectId
  createdAt: Date
  updatedAt: Date
}

export type Realm = ModelBase & {
  name: string
  isRunning: boolean
}

export type Models = {
  realm: Realm
}
