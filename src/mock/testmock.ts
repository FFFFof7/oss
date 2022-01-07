// test.ts
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/test',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          name: 'vben'
        }
      }
    }
  }
] as MockMethod[]
