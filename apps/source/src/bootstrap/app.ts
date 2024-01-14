import { bootstrapApollo } from './apollo.js'
import { bootstrapEnvironment } from './environment.js'
import { bootstrapMongo } from './mongodb.js'

export async function bootstrapApp() {
  bootstrapEnvironment()
  const database = await bootstrapMongo()
  await bootstrapApollo({ database })
}
