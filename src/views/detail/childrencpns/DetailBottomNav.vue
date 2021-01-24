<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    addToCart(){
      this.$emit('addToCart')
    }
  },
};
</script>
<style scoped>
.bottom-bar {
  height: 49px;
  background: #fff;
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
  box-shadow: 0 1px 5px rgba(0,0,0,.3);
}
.bar-item{
    display: flex;
    flex: 1;
}
.bar-item>div{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column wrap;
}
.bar-left{
    font-size: 13px;
}
.icon{
    background:url('~assets/img/detail/detail_bottom.png') no-repeat;
    background-size: 100%;
    width: 22px;
    height: 22px;
    margin-bottom: 2px;
}
.service{
    background-position: 0 -53px;
}
.shop{
    background-position: 0  -98px;
}
.select{
    background-position: 0  0px;
}
.bar-right{
    color: #fff;
    font-size: 15px;
}
.cart{
    background-color: #ffe817;
    color: #333;
}
.buy{
    background-color: #f69;
}
</style>