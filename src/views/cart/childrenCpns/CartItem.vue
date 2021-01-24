<template>
  <div class="cart-item">
      <div class="item-selector">
          <check-button @click.native="buttonClick" :is-checked="itemInfo.checked"></check-button>
      </div>
      <div class="item-img">
          <img :src="itemInfo.image" alt="商品图片">
      </div>
      <div class="item-info">
          <div class="item-title">{{itemInfo.title}}</div>
          <div class="item-desc">{{itemInfo.desc}}</div>
          <div class="info-bottom clear-fix">
              <div class="item-price left">￥{{itemInfo.price}}</div>
              <div class="item-count right">x{{itemInfo.count}}</div>
          </div>
      </div>
  </div>
</template>
<script>
import CheckButton from 'components/context/checkButton/CheckButton.vue';
export default {
  components: { CheckButton },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
      buttonClick(){
          this.itemInfo.checked = !this.itemInfo.checked;
      }
  },
};
</script>
<style scoped>
.cart-item{
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
}
.item-selector{
    width: 20px;
    display:flex;
    justify-content: center;
    align-items: center;
}
.item-img{
    padding: 5px;
}
.item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
}
.item-info{
    flex: 1;
    font-size: 16px;
    color: #333;
    padding: 5px 10px;
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
}
.item-title,.item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.item-desc{
    font-size: 13px;
    color: #666;
}
.item-price{
    color: #f40;
    font-size: 14px;
}
.item-count{
    font-size: 14px;
}
</style>