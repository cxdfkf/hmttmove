import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
// 复制一个axios别名request
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 处理大数据问题,在后台返回数据到达then之前，对axios的默认处理进行转化
request.defaults.transformResponse = [function (data) {
  return data ? jsonBig.parse(data) : {}
}]

// 请求拦截  请求到达后台之前拦截
request.interceptors.request.use(function (config) {
  // 在发起请求请做一些业务处理
  // config是要发送请求的配置信息
  let user = store.state.user
  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}` // 统一注入token 到headers属性 因为所有接口要求的token格式是一样的
  }
  // let token = window.localStorage.getItem('user-token') // 获取token

  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})
export default request
