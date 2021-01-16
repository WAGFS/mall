<template>
  <div id="home">
    <!-- 顶部导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
     ref="scroll" 
     @scroll="showBackTop" 
     :probeType="3"
     :pullUpLoad="true"
     @pullingUp="loadMore">
      <!-- 首页轮播图 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 推荐 -->
      <recommend-view :recommend="recommends"></recommend-view>
      <!-- 特性 -->
      <feature-view></feature-view>
      <!-- tab栏 -->
      <tab-control
        :title="['流行', '新款', '精选']"
        class="tabControl"
        @tabClick="tabClick"
      ></tab-control>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 回到顶部按钮 -->
    <back-top @click.native="backTop" v-show="showBack"></back-top>
  </div>
</template>
<script>
import HomeSwiper from "./childrencpns/HomeSwiper.vue";
import FeatureView from "./childrencpns/featureView.vue";
import RecommendView from "./childrencpns/RecommendView.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/context/tabControl/tabControl.vue";
import GoodsList from "components/context/goodsList/goodsList.vue";
import Scroll from "components/common/scroll/scroll.vue";
import BackTop from 'components/context/backTop/backTop.vue';

import { homeMultidata, getHomeGoods } from "network/home";
export default {
  name: "home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
      currentType: "pop",
      showBack:false
    };
  },
  created() {
    // 请求轮播图数据和推荐数据
    this.homeMultidata();
    // 请求 流行/新款/精选
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件监听相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backTop(){
        this.$refs.scroll.scrollTo(0,0);
    },
    showBackTop(position){
      this.showBack = position.y <= -1000 ? true : false;
    },
    loadMore(){
      this.getHomeGoods(this.currentType);
    },
    /**
     * 网络请求相关
     */
    homeMultidata() {
      homeMultidata().then(({ data: { banner, recommend } }) => {
        //  注意：在下文代码中，一定要用一对小括号包裹解构赋值语句，javascript引擎将一对开放的花括号视为一个代码块，而语法规定，代码块不能出现在赋值语句的左侧，添加小括号后可以将块语句转化为一个表达式，从而实现整个解构赋值的过程。
        //  ({banner:this.banners,recommend:this.recommends} = data)
        this.banners = banner.list;
        this.recommends = recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // 保存数据
        this.goods[type].list.push(...res.data.list);
        //  页码加1
        this.goods[type].page++;
      });
      // 重新绑定上拉加载更多事件
      this.$refs.scroll && this.$refs.scroll.finish()
    },
  },
};
</script>
<style scoped>
#home {
  padding-top: 44px;
  padding-bottom: 49px;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.tabControl {
  position: sticky;
  background: #fff;
  top: 44px;
}
.content{
  height: calc(100vh - 93px);
  overflow: hidden;
}
</style>