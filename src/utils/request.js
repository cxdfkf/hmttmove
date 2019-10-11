import axios from 'axios'
import jsonBig from 'json-bigint'
// 复制一个axios别名request
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 处理大数据问题
request.defaults.transformResponse = [function (data) {
  return data ? jsonBig.parse(data) : {}
}]
export default request
