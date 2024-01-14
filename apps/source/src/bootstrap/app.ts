import { bootstrapApollo } from './apollo'
import { bootstrapEnvironment } from './environment'
import { bootstrapMongo } from './mongodb'

export async function bootstrapApp() {
  bootstrapEnvironment()
  const database = await bootstrapMongo()
  await bootstrapApollo({ database })
}
