<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <div class="avatar left">
            <img src="~assets/img/profile/avatar.svg" alt="">
        </div>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <div class="icon-mobile">
                <img src="~assets/img/profile/phone.svg" alt="">
            </div>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <div class="arrow right">
          <img src="~assets/img/common/arrow-left.svg" alt="">
      </div>
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .avatar {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }
   img{
       width: 100%;
   }

  .left {
    float: left;
  }

  #user-info .arrow {
    width: 16px;
    height: 16px;
    margin-top: 18px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 20px;
    left: -19px;
    top: -2px;
  }
  .icon-mobile img{
      transform: scale(1,.85);
  }
</style>
