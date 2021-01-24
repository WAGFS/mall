<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list ref="cartList"></cart-list>
    <!-- 底部导航 -->
    <cart-bottom-nav></cart-bottom-nav>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";

import { mapGetters } from "vuex";

import CartList from './childrenCpns/CartList.vue';
import CartBottomNav from './childrenCpns/CartBottomNav.vue';

export default {
  components: { NavBar,CartList, CartBottomNav },
  name: "Cart",
  computed: {
    // 两种用法
    // 1.数组形式 使用时，计算属性名称与getters里方法名称一致
    // ...mapGetters(['cartLength','cartList'])
    // 2.对象形式 使用自己定义的名称
    ...mapGetters({
      length: "cartLength"
    }),
  }
};
</script>
<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>