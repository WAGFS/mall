<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!-- 左侧tab栏 -->
    <tab-bar :titles="menuList" @selectItem="selectItem"></tab-bar>
    <!-- 右侧tab栏内容 -->
    <scroll class="wrapper" ref="scroll">
      <tab-content-category :subCategory="showCategory"></tab-content-category>
      <!-- tab栏 -->
      <tab-control
        :title="tabTitles"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <!-- 货物列表 -->
      <goods-list
        :goods="showCategoryDetail"
        @itemImgLoad="itemImgLoad"
      ></goods-list>
    </scroll>
  </div>
</template>
<script>
import TabBar from "./childrenCpns/TabMenu";
import TabContentCategory from "./childrenCpns/TabContentCategory";

import {
  category,
  getSubcategory,
  getCategoryDetail,
} from "network/category.js";

import { mixins } from "common/mixin.js";

import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/scroll.vue";
import TabControl from "components/context/tabControl/tabControl.vue";
import GoodsList from "components/context/goodsList/goodsList.vue";

export default {
  name: "Category",
  components: {
    TabBar,
    NavBar,
    TabContentCategory,
    Scroll,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      menuList: [],
      currentIndex: -1,
      currentType: "pop",
      categoryData: {},
      tabTitles:['综合', '新品', '销量'],
      tabTypes:['pop','new','sell'],
    };
  },
  mixins: [mixins],
  created() {
    // 请求分类数据
    this._requestCategory();
  },
  computed: {
    showCategory() {
      if (this.currentIndex === -1) return;
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return;
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
    _requestCategory() {
      category().then((res) => {
        this.menuList = res.data.category.list;
        for (let i = 0; i < this.menuList.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        this.selectItem(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const maitKey = this.menuList[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        // 响应式数据，对象、数组特殊处理
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail("pop");
        this._getCategoryDetail("sell");
        this._getCategoryDetail("new");
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.menuList[this.currentIndex].miniWallkey;
      // 2.发送请求，传入如miniWallkey
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将请求数据保存
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    // 监听tab栏被点击
    selectItem(index) {
      this._getSubcategories(index);
      this.$refs.scroll.scrollTo(0,0,0);
      this.$refs.tabControl.currentIndex = 0;
    },
    // 监听货物详情列表tab栏被点击
    tabClick(index){
      this.currentType = this.tabTypes[index]
    }
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$bus.$on('itemImgLoad',this.itemImgLoad)
  },
  deactivated() {
    this.$bus.$off('itemImgLoad',this.itemImgLoad)
  },
};
</script>
<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: #fff;
}
.wrapper {
  position: absolute;
  top: 44px;
  left: 104px;
  bottom: 49px;
  width: calc(100vw - 104px);
  background: #fff;
  overflow: hidden;
}
.tab-control {
  background: #fff;
  margin-top: 10px;
}
</style>