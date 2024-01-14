import { MongoClient } from 'mongodb'

export async function bootstrapMongo() {
  const uri = process.env.DATABASE_URL
  const databaseName = process.env.DATABASE_NAME

  if (!uri) {
    throw new Error('Missing DATABASE_URL environment variable')
  }
  if (!databaseName) {
    throw new Error('Missing DATABASE_NAME environment variable')
  }

  const client = new MongoClient(uri)
  await client.connect()
  return client.db(databaseName)
}
