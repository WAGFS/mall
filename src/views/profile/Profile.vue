<template>
  <div id="profile">
    <nav-bar class="p-navbar">
      <div slot="center">超级市场</div>
    </nav-bar>
    <!--单独封装一个组件: 利用slot知识点-->
    <user-info></user-info>
    <!-- 账户组件 -->
    <account></account>
    <!-- 信息、商城、积分等模块 -->
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";

import UserInfo from "./childrenCpns/UserInfo";
import Account from "./childrenCpns/Account";
import ListView from './childrenCpns/ListView'
export default {
  components: { NavBar, UserInfo, Account, ListView },
  name: "Profile",
  data() {
    return {
      orderList: [
        { src: require("assets/img/profile/message.svg"), info: "我的消息" },
        { src: require("assets/img/profile/shopping.svg"), info: "积分商城" },
        { src: require("assets/img/profile/vip.svg"), info: "会员卡" },
      ],
      serviceList: [
        { src: require("assets/img/profile/cart.svg"), info: "我的购物车" },
        { src: require("assets/img/profile/pointer.svg"), info: "下载购物APP" },
      ],
    };
  },
  mounted() {},
};
</script>
<style scoped>
#profile {
  background-color: #f2f2f2;
}

.p-navbar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.order-list,
.service-list {
  margin-top: 12px;
}
</style>