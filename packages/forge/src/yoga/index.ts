import { createServer } from 'node:http'

import { createCoreYoga } from './core/index.js'

export async function startYogaServer() {
  return new Promise<void>(resolve => {
    const core = createCoreYoga()
    const server = createServer(async (req, res) => {
      if (req.url?.startsWith('/graphql/core')) {
        return core.handle(req, res)
      } else {
        res.writeHead(404)
        res.end('Not Found')
      }
    })
    server.listen(3000, resolve)
  })
}
