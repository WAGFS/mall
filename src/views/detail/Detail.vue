<template>
  <div id="detail">
    <!-- 顶部导航 -->
    <nav-bar class="detail-nav"></nav-bar>
    <scroll
      class="detail-content"
      ref="scroll"
      @scroll="monitorY"
      :probeType="3"
    >
      <!-- 详情页轮播图 -->
      <detail-swiper :imgList="imgList" @imgLoaded="imgLoad"></detail-swiper>
      <!-- 商品信息 -->
      <detail-base-info :goods="g"></detail-base-info>
      <!-- 商家信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品详情 -->
      <detail-goods-info
        :detailInfo="detailInfo"
        @detailImgLoaded="imgLoad"
      ></detail-goods-info>
      <!-- 商品参数 -->
      <detail-param-info :paramsInfo="paramsInfo"></detail-param-info>
      <!-- 用户评论 -->
      <detail-comment :commentList="commentList"></detail-comment>
      <!-- 底部推荐列表展示 -->
      <goods-list :goods="goodsList">
        <div slot="top" class="hotRecommend">热门推荐</div>
      </goods-list>
    </scroll>
    <!-- 回到顶部按钮 -->
    <back-top @click.native="backTop" v-show="isShowBack"></back-top>
  </div>
</template>
<script>
import NavBar from "./childrencpns/DetailNavBar";
import DetailSwiper from "./childrencpns/DetailSwiper.vue";
import DetailBaseInfo from "./childrencpns/DetailBaseInfo.vue";
import DetailShopInfo from "./childrencpns/DetailShopInfo.vue";
import DetailGoodsInfo from "./childrencpns/DetailGoodsInfo.vue";
import DetailParamInfo from "./childrencpns/DetailParamInfo.vue";
import DetailComment from "./childrencpns/DetailComment.vue";

import Scroll from "components/common/scroll/scroll.vue";
import GoodsList from "components/context/goodsList/goodsList.vue";
import BackTop from "components/context/backTop/backTop.vue";

import { mixins } from "common/mixin";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
export default {
  name: "Detail",
  components: {
    NavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComment,
    GoodsList,
    BackTop,
  },
  // 由于this.$refs.scroll在created完成后还未填充数据，所以在mounted中来监听
  // 防止滚动不了的问题
  mixins: [mixins],
  data() {
    return {
      iid: null,
      imgList: [],
      g: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentList: [],
      goodsList: [],
      isShowBack: false,
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
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.保存评论信息
      this.commentList = data.rate.list;
    });
    // 7.请求底部推荐列表
    this._getRecommend();
  },
  mounted() {},
  methods: {
    imgLoad() {
      this.refresh();
    },
    _getRecommend() {
      getRecommend().then((res) => {
        this.goodsList = res.data.list;
      });
    },
    // 回到顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 监听页面是否滚动到指定区域
    monitorY(position) {
      this.isShowBack = position.y <= -1500 ? true : false;
    },
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgLoad);
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
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.hotRecommend {
  padding: 10px 15px 0;
  color: var(--color-high-text);
}
</style>