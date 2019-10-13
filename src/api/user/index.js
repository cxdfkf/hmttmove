import request from '@/utils/request'
export function userYz (data) {
  return request({
    url: '/app/v1_0/authorizations',
    data,
    method: 'post'
  })
}
