import { bootstrapApollo } from './apollo.js'
import { bootstrapEnvironment } from './environment.js'
import { bootstrapMongo } from './mongodb.js'

export async function bootstrapApp() {
  bootstrapEnvironment()
  const { database, models } = await bootstrapMongo()
  await bootstrapApollo({ database, models })
}
