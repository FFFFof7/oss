import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: '/api'
})

interface options extends AxiosRequestConfig {
  needSign?: boolean
}
interface Response extends AxiosResponse {
  code: number
}
export default function request(url: string, options?: options) {
  const defaultOpt: options = {
    needSign: true
  }
  const opt = { ...defaultOpt, options }
  return instance(url, opt).then(({ data, ...response }) => {
    const r: Response = {
      data: data.data,
      code: data.code,
      ...response
    }
    return r
  })
}
