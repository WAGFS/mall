<template>
  <div>
  <slot name="top"></slot>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsInfo="item"></goods-list-item>
  </div>
  </div>
</template>
<script>
import GoodsListItem from "./goodsListItem";
export default {
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding:1%;
    overflow: hidden;
}
</style>