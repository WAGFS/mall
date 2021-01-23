<template>
  <div>
    <nav-bar>
      <div slot="left" @click="back" class="back">
        <img src="~assets/img/common/back.svg" />
      </div>
      <div slot="center" class="title">
        <div
          class="titleItem"
          v-for="(item, index) in title"
          :key="item"
          @click="titleClick(index)"
          :class="{ active: index === currentIndex }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  components: {
    NavBar,
  },
  props: {
    isComment: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      title: [],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    back() {
      this.$router.go(-1);
    },
  },
  watch: {
    isComment(newValue, oldValue) {
      if (newValue.length === 0) {
        this.title = ["商品", "参数", "推荐"];
      } else {
        this.title = ["商品", "参数", "评论", "推荐"];
      }
    },
  },
};
</script>
<style scoped>
.back {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.title {
  display: flex;
  font-size: 13px;
}
.titleItem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>