<template>
  <div class="recommendView">
    <div class="recommendBox" v-for="(item,index) in recommend" :key="index">
      <a :href="item.link">
        <img :src="item.image" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.recommendView {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 20px 0;
  border-bottom: 8px solid #eee;
}
.recommendBox {
  flex: 1;
}
.recommendBox a {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.recommendBox img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}
</style>