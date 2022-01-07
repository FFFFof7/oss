import url from 'url'
import path from 'path'
import { watch } from 'chokidar'
import { getMocks, requestMethodTest, bodyParse } from './utils'
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
    /**
     * TODO: 热跟新无效 需要删除require缓存
     * https://github.com/vbenjs/vite-plugin-mock/blob/be46ea7bcc691a27d149bb81417a61301f68fefb/src/createMockServer.ts#L141
     * https://github.com/chuzhixin/vue-admin-better/blob/master/mock/index.js#L80
     */
    watcher.on('all', function (eventName, path) {
      // console.log(Object.keys(require.cache))
      // delete require.cache['']
      console.log(eventName, path)
      mocks = getMocks(mainPath)
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
            return res.end(JSON.stringify(item.respond(requestParams)))
          } else {
            return item.respond(requestParams)
          }
        }
      }
      res.statusCode = 404
      res.end('404')
    })
  }
})
