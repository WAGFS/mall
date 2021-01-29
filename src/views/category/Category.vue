<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <tab-bar :titles="menuList"></tab-bar>
  </div>
</template>
<script>
import TabBar from "./childrenCpns/TabMenu";

import NavBar from "components/common/navbar/NavBar.vue";

import { category } from "network/category.js";
export default {
  name: "Category",
  components: { TabBar, NavBar },
  data() {
    return {
      menuList: [],
    };
  },
  created() {
    // 请求分类数据
    this._requestCategory();
  },
  methods: {
    _requestCategory() {
      category().then(res => {
        this.menuList = res.data.category.list;
      })
    },
  },
};
</script>
<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
}
</style>