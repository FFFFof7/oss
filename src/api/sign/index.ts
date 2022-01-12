import request from '@/utils/request'

export function qrcodeSign() {
  return request('qrcodeSign')
}
export function getScanInfo() {
  return request('getScanInfo')
}
