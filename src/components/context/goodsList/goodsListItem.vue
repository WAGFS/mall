<template>
  <div class="goodsItem">
    <img :src="goodsInfo.show.img" :alt="goodsInfo.title" />
    <div>
      <p class="title">{{ goodsInfo.title }}</p>
      <span class="price">￥{{ goodsInfo.price }}</span>
      <span class="collect">{{ goodsInfo.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.goodsItem {
  width: 48%;
  text-align: center;
  font-size: 14px;
  padding: 5px;
}
.goodsItem img {
  width: 100%;
  height: 85%;
  border-radius: 5%;
  overflow: hidden;
}
.goodsItem div {
  padding-top: 5px;
}
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom:2px ;
}
.price {
  color: var(--color-high-text);
}
.collect::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: top;
  background: url("~assets/img/common/collect.svg") 0 0 / 14px 14px;
}
.collect {
  padding: 0 5px;
}
</style>