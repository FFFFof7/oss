// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mock = require('mockjs')
const Random = Mock.Random
module.exports = [
  {
    api: '/test/:id',
    respond() {
      return { a: Random.email('qq.com') }
    }
  },
  {
    api: '/test',
    respond() {
      return { a: Random.email('qq.com') }
    }
  },
  {
    api: '/test2',
    respond() {
      return { a: Random.email('163.com') }
    }
  }
]
