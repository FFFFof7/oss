/* eslint-disable @typescript-eslint/no-var-requires */
import { match } from 'path-to-regexp'

export function getMocks(mockPath: string) {
  const mocks = require(mockPath)
  return mocks.map((mock) => {
    return {
      urlMatch: match(mock.api, { decode: decodeURIComponent }),
      respond: mock.respond
    }
  })
}
export function requestMethodTest(req, testMethod: string) {
  if (!testMethod) return true
  return req.method === testMethod?.toUpperCase()
}
// TODO: body parse修改
export function bodyParse(req) {
  return new Promise((resolve) => {
    const contentType = req.headers['content-type']
    if (contentType === 'application/json') {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', () => {
        try {
          resolve(JSON.parse(body))
        } catch (error) {
          resolve({})
        }
      })
    } else {
      resolve({})
    }
  })
}
