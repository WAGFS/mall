import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
// 导入toast插件
import toast from 'components/common/toast'

let attachFastClick = require('fastclick');
attachFastClick(document.body);

Vue.config.productionTip = false

// 使用插件
Vue.use(toast);
// 注册事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
