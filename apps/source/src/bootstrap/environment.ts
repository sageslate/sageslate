import { resolve } from 'node:path'

import { config } from 'dotenv'

export function bootstrapEnvironment() {
  if (process.env.NODE_ENV === 'development') {
    config({
      path: resolve(process.cwd(), '.env.development'),
    })
  }
}
