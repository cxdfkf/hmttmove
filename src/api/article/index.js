import request from '@/utils/request'
// 获取简单的文章
export function getArticles (params) {
  return request({
    url: '/app/v1_1/articles',
    method: 'get',
    params
  })
}
// 获取文章详情
export function getArticlesDetail (articleId) {
  return request({
    url: '/app/v1_0/articles/' + articleId
  })
}
