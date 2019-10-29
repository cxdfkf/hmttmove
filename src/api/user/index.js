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
export function focusUser (userId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: { target: userId }
  })
}
// 取消关注
export function cancleUser (userId) {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/user/followings/' + userId

  })
}
// 获取用户自己的信息
export function getUserInfo () {
  return request({
    method: 'get',
    url: '/app/v1_0/user'

  })
}
/**
 * 获取用户个人资料
 */
export function getProfile (userId) {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
// 更新用户头像
export function updateUserPhoto (data) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
/**
 * 更新用户基本信息
 */
export function updateUserProfile (data) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
