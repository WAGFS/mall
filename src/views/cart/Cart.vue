<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";

import { mapGetters } from "vuex";

export default {
  components: { NavBar },
  name: "Cart",
  computed: {
    // 两种用法
    // 1.数组形式 使用时，计算属性名称与getters里方法名称一致
    // ...mapGetters(['cartLength','cartList'])
    // 2.对象形式 使用自己定义的名称
    ...mapGetters({
      length: "cartLength",
      cart: "cartList",
    }),
  },
};
</script>
<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>