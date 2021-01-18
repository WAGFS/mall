<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :src="item"
        :key="index"
        @load="imgLoad"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      this.$emit("detailImgLoaded");
    },
  },
};
</script>
<style scoped>
.goods-info{
    border-bottom: 5px solid #f2f5f8;
}
.info-desc{
    padding: 10px;
}
.start::before,.end::after{
    position: absolute;
    top: -5px;
    left: 0;
    display: inline-block;
    content: '';
    width: 5px;
    height: 5px;
    background-color: #000;
}
.end::after{
    right: 0;
    left: auto;
}
.start,.end{
    width: 100px;
    height: 1px;
    background-color: #000;
    position: relative;
}
.start{
    float: left;
}
.end{
    float:right;
}
.desc{
    margin: 10px 0;
    font-size: 14px;
}
.info-key{
    padding: 10px;
}
.info-list img{
    width: 100%;
}
</style>