<template>
  <div class="bottom-nav">
    <div class="checked-area">
      <check-button class="check-button" @click.native="allChecked" :is-checked="isAll"></check-button>
      <span>全选</span>
    </div>
    <div class="totalPrice">
      <span>合计:</span>￥{{ totalPrice }}
    </div>
    <div class="calclutate">结算{{ calclutate }}</div>
  </div>
</template>
<script>
import CheckButton from "components/context/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList","cartLength"]),
    totalPrice() {
      return this.cartList
        .filter((item) => item.checked)
        .reduce((oldValue, item) => oldValue + item.price * item.count, 0)
        .toFixed(2);
    },
    calclutate() {
      const length = this.cartList.filter((item) => item.checked).length;
      return length === 0 ? "" : `(${length})`;
    },
    isAll(){
        return this.cartList.filter(item => item.checked).length === this.cartLength;
    }
  },
  methods: {
      allChecked(){
          this.$store.dispatch('changeAllChecked',this.isAll)
      }
  },
};
</script>
<style scoped>
.bottom-nav {
  height: 40px;
  width: 100%;
  background: #fff;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
}
.checked-area {
  display: flex;
  align-items: center;
  height: 100%;
  min-width: 60px;
  font-size: 13px;
  color:#78787D;
}
.check-button {
  margin-right: 5px;
}
.totalPrice{
    flex: 1;
    text-align: right;
    padding-right: 10px;
    font-size: 14px;
    color: #ff4769;
    height: 30px;
    line-height: 30px;
}
.totalPrice > span{
    color:#333;
}
.calclutate{
    min-width: 90px;
    height: 100%;
    background-image:-moz-linear-gradient(to bottom,#FF99AC,#FF708A) ;
    color: #fff;
    border-radius: 15px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
}
</style>