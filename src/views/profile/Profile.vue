<template>
  <div id="profile">
    <nav-bar class="p-navbar">
      <div slot="center">超级市场</div>
    </nav-bar>
     <!--1.单独封装一个组件: 利用slot知识点-->
    <UserInfo></UserInfo>

    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue';
export default {
  components: { NavBar },
  name: "Profile",
  data() {
    return {
    };
  },
  mounted() {},
};
</script>
<style scoped>
.p-navbar{
  background: var(--color-tint);
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1em;
}
</style>