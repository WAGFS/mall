<template>
  <div id="homeSwiper">
    <swiper>
      <swiper-item v-for="item in banners" :key="item.link">
        <a :href="item.link">
          <img :src="item.image" :title="item.title" @load="imgLoaded" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imgLoaded() {
      if (!this.isLoad) {
        this.$emit("swiperImgLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>