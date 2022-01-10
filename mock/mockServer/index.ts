import url from 'url'
import path from 'path'
import { watch } from 'chokidar'
import { getMocks, requestMethodTest, bodyParse, logger } from './utils'
import type { Config } from './type'
/* eslint-disable @typescript-eslint/no-var-requires */

let mocks = []
export default (config: Config) => ({
  name: 'mockServer',
  config() {
    const { mockPath, mainName } = config
    const mainPath = path.resolve(mockPath, mainName || 'index.ts')
    mocks = getMocks(mainPath)
    const watcher = watch(mockPath, {
      ignored: /mockServer/,
      ignoreInitial: true
    })
    // TODO: 更新策略待优化
    watcher.on('all', function () {
      Object.keys(require.cache).forEach((item) => {
        if (item.includes(mockPath)) {
          delete require.cache[require.resolve(item)]
        }
      })
      mocks = getMocks(mainPath)
      logger('update', '')
    })
  },
  configureServer({ middlewares }) {
    middlewares.use(config.baseUrl, async (req, res) => {
      const parseUrl = url.parse(req.url, true)
      for (let i = 0; i < mocks.length; i++) {
        const item = mocks[i]
        const match = item.urlMatch(parseUrl.pathname)
        if (match && requestMethodTest(req, item.method)) {
          const body = await bodyParse(req)
          const requestParams = {
            req,
            res,
            body,
            query: parseUrl.query,
            params: parseUrl.query
          }
          res.statusCode = item.statusCode || 200
          if (!item.type || item.type === 'json') {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(item.respond(requestParams)))
            return logger('request success', `${req.method} ${req.url}`)
          } else {
            item.respond(requestParams)
            return logger('request success', `${req.method} ${req.url}`)
          }
        }
      }
      res.statusCode = 404
      res.end('404')
      logger('request error', `${req.method} ${req.url}`, 'error')
    })
  }
})
