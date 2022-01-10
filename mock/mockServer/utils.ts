/* eslint-disable @typescript-eslint/no-var-requires */
import { match } from 'path-to-regexp'
import chalk from 'chalk'
import { Mocks } from './type'

export function getMocks(mockPath: string): Mocks {
  let mocks = []
  try {
    mocks = require(mockPath)
  } catch (e) {
    let stack = e.requireStack
    if (Array.isArray(e.requireStack)) {
      stack = '\n' + e.requireStack.join('\n')
    }
    logger(e.code, stack, 'error')
    return false
  }
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
export function logger(title: string, msg: string, type: 'info' | 'warning' | 'error' = 'info') {
  let titleMethod = chalk.green
  let tagMethod = chalk.cyan.bold
  switch (type) {
    case 'warning':
      titleMethod = chalk.yellow
      tagMethod = chalk.yellow.bold
      break
    case 'error':
      titleMethod = chalk.red
      tagMethod = chalk.red.bold
      break
  }
  // eslint-disable-next-line no-console
  return console.log(
    `${chalk.dim(new Date().toLocaleTimeString())} ${tagMethod('[vite:mock]')} ${titleMethod(
      title
    )} ${titleMethod(msg)}`
  )
}
