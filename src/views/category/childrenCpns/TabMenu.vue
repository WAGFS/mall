<template>
  <div class="tab-menu">
    <scroll class="content">
      <div
        v-for="(item, index) in titles"
        :key="index"
        class="meun-item"
        :class="{ active: index === currentIndex }"
        @click="titleClick(index)"
      >
        {{ item.title }}
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/scroll.vue";

export default {
  components: { Scroll },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
      return {
          currentIndex:0
      }
  },
  methods: {
      titleClick(index){
        this.currentIndex = index;
        this.$emit('selectItem',index);
      }
  },
};
</script>
<style scoped>
.tab-menu {
  background: #f6f6f6;
  width: 100px;
  font-size: 14px;
}
.content {
  height: calc(100vh - 49px - 44px);
  overflow: hidden;
}
.meun-item {
  padding: 14px 10px;
  text-align: center;
  border-left: 3px solid transparent;
}
.active {
  border-left: 3px solid var(--color-high-text);
  color: var(--color-high-text);
  font-weight: bold;
  background: #fff;
}
</style>