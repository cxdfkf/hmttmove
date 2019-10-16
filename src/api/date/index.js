import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'// 按需加载
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
dayjs.locale('zh-cn')// 全局使用中文

dayjs.extend(relativeTime)

Vue.filter('relativeTime', (value) => {
  return dayjs().from(dayjs(value))
})
