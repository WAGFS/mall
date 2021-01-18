<template>
  <div id="detail">
    <!-- 顶部导航 -->
    <nav-bar class="detail-nav"></nav-bar>
    <scroll class="detail-content" ref="detailScroll">
      <!-- 详情页轮播图 -->
      <detail-swiper :imgList="imgList" @imgLoaded="imgLoad"></detail-swiper>
      <!-- 商品信息 -->
      <detail-base-info :goods="g"></detail-base-info>
      <!-- 商家信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品详情 -->
      <detail-goods-info :detailInfo="detailInfo" @detailImgLoaded="imgLoad"></detail-goods-info>
      <!-- 商品参数 -->
      <detail-param-info :paramsInfo="paramsInfo"></detail-param-info>
      <!-- 用户评论 -->
      <detail-comment :commentList="commentList"></detail-comment>
    </scroll>
  </div>
</template>
<script>
import NavBar from "./childrencpns/DetailNavBar";
import DetailSwiper from "./childrencpns/DetailSwiper.vue";
import DetailBaseInfo from "./childrencpns/DetailBaseInfo.vue";
import DetailShopInfo from "./childrencpns/DetailShopInfo.vue";
import DetailGoodsInfo from './childrencpns/DetailGoodsInfo.vue';
import DetailParamInfo from './childrencpns/DetailParamInfo.vue';
import DetailComment from './childrencpns/DetailComment.vue';

import Scroll from "components/common/scroll/scroll.vue";

import { getDetail, Goods, Shop, GoodsParam } from "network/detail";
export default {
  name: "Detail",
  components: { NavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo, Scroll, DetailGoodsInfo, DetailParamInfo, DetailComment },
  data() {
    return {
      iid: null,
      imgList: [],
      g: {},
      shop: {},
      detailInfo:{},
      paramsInfo:{},
      commentList:[]
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // 1.获取轮播图数据
      this.imgList = data.itemInfo.topImages;
      // 2.获取商品数据
      this.g = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      // 3.获取商家信息数据
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取商品参数
      this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // 6.保存评论信息
      this.commentList = data.rate.list;
      // console.log(data.rate);
    });
  },
  methods: {
    imgLoad(){
      const detail = this.debounce(this.$refs.detailScroll.refresh,100);
      detail();
    },
    //   防抖
    debounce(fnc, delay) {
      let timer;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fnc.apply(this, args);
        }, delay);
      };
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-content {
  height: calc(100vh - 44px);
  overflow: hidden;
}
.detail-nav{
  position: relative;
  z-index:10;
  background-color: #fff;
}
</style>