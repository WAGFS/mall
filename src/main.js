import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
// 导入toast插件
import toast from 'components/common/toast'

// 解决移动端300ms延迟问题
import attachFastClick from 'fastclick'
attachFastClick.attach(document.body);

// 使用图片懒加载
import imgLazy from 'vue-lazyload';
Vue.use(imgLazy,{
  loading:require('./assets/img/common/placeholder.png')
})

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
