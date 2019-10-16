import request from '@/utils/request'
export function getArticles (params) {
  return request({
    url: '/app/v1_1/articles',
    method: 'get',
    params
  })
}
