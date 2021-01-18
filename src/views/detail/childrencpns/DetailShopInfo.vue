<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{ shop.sells | sellCountFilter }}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter(value) {
      if (typeof value !== "number") return;
      if (value >= 10000) {
        const newValue = (value / 10000).toFixed(1);
        return newValue + "万";
      } else {
        return value;
      }
    },
  },
};
</script>
<style scoped>
.shop-info {
  padding: 20px 10px;
  border-bottom:5px solid #f2f5f8;
}
.shop-top {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.shop-top img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #eee;
}
.shop-middle {
  display: flex;
  color: #333;
  font-size: 12px;
}
.shop-middle-item {
  flex: 1;
}
.shop-middle-left {
  display: flex;
}
.info-sells,
.info-goods {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.info-goods {
  border-right: 2px solid #eee;
}
.sells-count,
.goods-count {
  font-size: 20px;
}
.shop-middle-right {
  box-sizing: border-box;
  padding-left: 12px;
}
.shop-middle-right table {
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: space-between;
}
.shop-middle-right tr {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.title {
  margin-left: 15px;
}
.score {
  color: #73de3d;
}
.better {
  background: #73de3d;
  color: #fff;
}
.score-better {
  color: red;
}
.better-more {
  background: red;
}
.shop-bottom {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 15px;
}
.enter-shop {
  background: #f5f5f5;
  padding: 5px 30px;
  border-radius: 10px;
}
</style>