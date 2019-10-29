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
// 对文章点赞
export function dianzan (articleId) {
  return request({ url: '/app/v1_0/article/likings', method: 'post', data: { target: articleId } })
}
// 取消对文章的点赞
export function cancleDianzan (articleId) {
  return request({ url: '/app/v1_0/article/likings/' + articleId, method: 'delete' })
}
// 对文章不喜欢
export function dislikeArticle (articleId) {
  return request({ url: '/app/v1_0/article/dislikes', method: 'post', data: { target: articleId } })
}
// 取消对文章不喜欢
export function likeArticle (articleId) {
  return request({ url: '/app/v1_0/article/dislikes/' + articleId, method: 'delete' })
}
