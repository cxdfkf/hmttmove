import request from '@/utils/request'
// 获取用户选中的频道
export function getChannel () {
  return request({ url: '/app/v1_0/user/channels' })
}

// 获取所有的频道
export function getAllchannel () {
  return request({ url: '/app/v1_0/channels' })
}
