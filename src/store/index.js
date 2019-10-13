import Vue from 'vue'
import Vuex from 'vuex'
import { getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
  },
  mutations: {
    tokenModify (state, user) {
      state.user = user
    }
  },
  actions: {

  }
})
