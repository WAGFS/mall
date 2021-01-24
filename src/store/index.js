import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 使用插件
Vue.use(Vuex);

const state = {
    cartList: []
  }
const store = new Vuex.Store({
  state,
  // mutations 的唯一目的就是修改state状态
  // mutations 中尽量执行一些简单的操作
  mutations,
  // actions 中用来处理一些复杂逻辑和异步操作
  actions,
  getters
})

// 导出store对象
export default store
