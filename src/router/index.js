import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      component: () => import('@/views/login')
    },
    {
      name: 'search',
      path: '/search',
      component: () => import('@/views/search')
    },
    {
      name: 'searchRes',
      path: '/search/:q',
      component: () => import('@/views/result')
    },
    {
      name: 'article',
      path: '/article/:articleId',
      component: () => import('@/views/articles')
    },
    {
      name: 'tabbar',
      path: '/index',
      component: () => import('@/views/tabbar'),
      children: [
        {
          path: '',
          component: () => import('@/views/home')
        }
      ]
    }
  ]
})
