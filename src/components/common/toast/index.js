// 导入插件模板
import Toast from './Toast.vue'

const obj = {
    // 在使用Vue.use()后，Vue都会默认调用插件下的install方法
    // 并且install方法中第一个参数默认会传递Vue构造函数
    install(Vue){
        // 创建组件构造函数
        const toastConstructor = Vue.extend(Toast);
        // 创建组件实例对象
        const toast = new toastConstructor();
        // 将组件对象手动挂载到某一个元素上(由于toast中有template，所以最终render函数会将template替换掉创建出来的div)
        // 所以无论$mount()中传入什么元素，最终页面上显示的都是toast中template里的内容
        toast.$mount(document.createElement('div'));
        // 将实例对象插入到页面中
        document.body.appendChild(toast.$el);
        // 将实例对象挂载到Vue原型上，以便调用实例对象下的方法
        Vue.prototype.$toast = toast;
    }
};

export default obj;