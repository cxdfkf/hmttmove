import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Button,
  NavBar,
  Field,
  Toast
} from 'vant'
import './styles/index.less'
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Field)
Vue.use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
