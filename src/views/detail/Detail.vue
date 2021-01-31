<template>
  <div id="detail">
    <!-- 顶部导航 -->
    <nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      :isComment="commentList"
      ref="detailNav"
    ></nav-bar>
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
      <detail-param-info
        :paramsInfo="paramsInfo"
        ref="params"
      ></detail-param-info>
      <!-- 用户评论 -->
      <detail-comment :commentList="commentList" ref="comment"></detail-comment>
      <!-- 底部推荐列表展示 -->
      <goods-list :goods="goodsList" ref="recommend">
        <div slot="top" class="hotRecommend">热门推荐</div>
      </goods-list>
    </scroll>
    <!-- 回到顶部按钮 -->
    <back-top @click.native="backTop" v-show="isShowBack"></back-top>
    <!-- 底部导航 -->
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>
<script>
import NavBar from "./childrenCpns/DetailNavBar";
import DetailSwiper from "./childrenCpns/DetailSwiper.vue";
import DetailBaseInfo from "./childrenCpns/DetailBaseInfo.vue";
import DetailShopInfo from "./childrenCpns/DetailShopInfo.vue";
import DetailGoodsInfo from "./childrenCpns/DetailGoodsInfo.vue";
import DetailParamInfo from "./childrenCpns/DetailParamInfo.vue";
import DetailComment from "./childrenCpns/DetailComment.vue";
import DetailBottomBar from "./childrenCpns/DetailBottomNav.vue";

import Scroll from "components/common/scroll/scroll.vue";
import GoodsList from "components/context/goodsList/goodsList.vue";
import BackTop from "components/context/backTop/backTop.vue";

import { mixins } from "common/mixin";
import { debounce } from "common/utils";
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
    DetailBottomBar,
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
      themeTopYs: [],
      // 获取商品、参数、评论、推荐的offsetTop
      themeTopY: null,
      currentIndex: 0,
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
  mounted() {
    this.themeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.$refs.params &&
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.$refs.comment &&
        this.$refs.comment.$el.offsetTop &&
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.$refs.recommend &&
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Infinity);
    }, 50);
  },
  methods: {
    imgLoad() {
      this.refresh();
      this.themeTopY();
    },
    // 监听导航栏被点击
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
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
      const length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          -position.y >= this.themeTopYs[i] &&
          -position.y < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailNav.currentIndex = i;
        }
      }
    },
    // 监听添加到购物车
    addToCart() {
      const production = {};
      production.image = this.imgList[0];
      production.price = this.g.realPrice;
      production.title = this.g.title;
      production.desc = this.g.desc;
      production.iid = this.iid;
      production.count = 1;

      // this.$store.commit("addCart", production);
      this.$store
        .dispatch("addCart", production)
        .then((res) => {
          this.$toast.show(res);
        })
        .catch((err) => {
          this.$toast.show(err);
        });
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
  height: calc(100vh - 44px - 49px);
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