import request from '@/utils/request'
// 提交用户验证
export function userYz (data) {
  return request({
    url: '/app/v1_0/authorizations',
    data,
    method: 'post'
  })
}

// 关注用户
export function focusUser () {
  return request({ url: '/app/v1_0/user/followings', method: 'post' })
}
