import request from '@/utils/request'
// 获取评论列表
export function getComment (params) {
  return request({
    url: '/app/v1_0/comments',
    method: 'get',
    params
  })
}
// 发布评论
export function addComment (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
// 对评论点赞
export function addCommentLike (commentId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

// 取消对评论点赞
export function deleteCommentLike (commentId) {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/comment/likings/' + commentId
  })
}
