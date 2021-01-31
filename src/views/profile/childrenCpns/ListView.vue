<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <div class="icon">
        <img :src="item.src" alt="" />
      </div>
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.listData[0].src);
  },
};
</script>

<style scoped>
#list {
  background-color: #fff;
  font-size: 15px;
  color: #333;
}

#list .item {
  height: 44px;
  line-height: 44px;
  position: relative;
}

.item .icon {
  position: absolute;
  left: 16px;
  top: 10px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.icon img {
  width: 100%;
  height: 100%;
}

.item .info {
  margin-left: 40px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-left: 5px;
}

.item:last-of-type .info {
  border-bottom: none;
}
</style>
