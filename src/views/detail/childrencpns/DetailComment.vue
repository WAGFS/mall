<template>
  <div class="detail-comment" v-if="commentList.length !== 0">
    <div class="user-comment">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="user-card" v-for="(item, index) in commentList" :key="index">
      <div class="userInfo">
        <img :src="item.user.avatar" />
        <span>{{ item.user.uname }}</span>
      </div>
      <div class="comment">
        {{ item.content }}
      </div>
      <div class="info-other">
        <span class="data">{{ item.created | showDate }}</span>
        <span class="style">{{ item.style }}</span>
      </div>
      <div class="imgBox">
        <img v-for="(img, indey) in item.images" :key="indey" :src="img" />
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "common/utils";
export default {
  props: {
    commentList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    showDate(value) {
      const date = new Date(1000 * value);
      return formatDate(date,'yyyy-MM-dd');
    },
  },
};
</script>
<style scoped>
.detail-comment {
  padding: 10px;
  border-bottom: 5px solid #f2f5f8;
}
.user-comment {
  padding: 10px 10px 10px 0;
  border-bottom: 2px solid #f2f5f8;
  font-size: 14px;
  color: #333;
  display: flex;
  justify-content: space-between;
}
.user-card {
  padding: 15px 0 0;
}
.userInfo {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  padding-bottom: 15px;
}
.userInfo img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}
.comment {
  font-size: 14px;
  letter-spacing: 0.1em;
}
.info-other{
    margin-top: 10px;
    font-size: 14px;
    color: #999;
}
.data{
    margin-right: 8px;
}
.imgBox {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 15px;
}
.imgBox img {
  margin-right: 2%;
  margin-bottom: 2%;
  width: 30vw;
  height: 30vw;
  border-radius: 5px;
}
.imgBox img:nth-child(3n) {
  margin-right: 0;
}
</style>