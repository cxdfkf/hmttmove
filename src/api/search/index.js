import request from '@/utils/request'
// 获取联想建议
export function getAdvice (params) {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params
  })
}
// 获取搜索结果
export function getRes (params) {
  return request({
    url: '/app/v1_0/search',
    params
  })
}
// 获取搜索记录

export function getHistory () {
  return request({ url: '/app/v1_0/search/histories' })
}
