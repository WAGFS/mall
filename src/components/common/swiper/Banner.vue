<template>
  <!-- 父容器 -->
  <div id="swiperBox">
    <!-- 轮播图容器 -->
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <!-- 轮播图指示器 -->
    <div class="indicator">
      <!-- 具名插槽，如果用户想要替换指示器样式则可以使用具名插槽 -->
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div
          v-for="(item, index) in slideCount"
          :key="index"
          class="indi-item"
          :class="{ active: index === activeIndex}"
        ></div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Swiper",
  props: {
    // 每隔多少秒执行一次
    interval: {
      type: Number,
      default: 3000,
    },
    // 轮播过渡时间
    animDuration: {
      type: Number,
      default: 300,
    },
    // 手指移动图片多少切换下一张
    moveRatio: {
      type: Number,
      // 移动图片自身宽度的25%切换下一张
      default: 0.25,
    },
    // 是否展示指示器
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      slideCount: 0, //元素个数
      totalWidth: 0, //图片的宽度
      swiperStyle: {}, //swiper的行间样式
      currentIndex: 1, // 当前的index
      activeIndex:0, //当前指示器
      scrolling: false, //是否正在滚动
    };
  },
  mounted() {
      // 异步获取元素，防止子组件还未渲染出
    setTimeout(() => {
      // 1.页面渲染完毕后，在前后插入第一张和最后一张图片，实现无缝轮播
      this.handleDom();

      //2.开启定时器
      this.startTimer();
    }, 500);
  },
  methods: {
    /**
     * 定时器函数
     */
    startTimer() {
      this.timer = window.setInterval(() => {
        this.currentIndex++;
        this.activeIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    /**
     * 清除定时器
     */
    clearTimer() {
      window.clearInterval(this.timer);
    },
    /**
     * 为swiper容器添加过渡效果，并设置模式为正在滚动状态
     */
    scrollContent(currentPosition) {
      // 1.设置轮播图正在滚动
      this.scrolling = true;

      //2.添加过渡效果，注意transform后面一定要加空格
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";

      //3.让swiper开始滚动
      this.setTransform(currentPosition);

      //4.监听图片是否滑动到最后一张或者第一张
      this.checkPosition();

      //5.滚动完成
      this.scrolling = false;
    },
    /**
     * 控制swiper偏移量
     */
    setTransform(translateX) {
      this.swiperStyle.transform = `translate(${translateX}px,0)`;
      this.swiperStyle["-webkit-transform"] = `translate(${translateX}px,0)`;
      this.swiperStyle["-ms-transform"] = `translate(${translateX}px,0)`;
    },
    /**
     * 监听图片是否滑动到最后一张或者第一张，
     * 实现无缝轮播
     */
    checkPosition() {
        // 不让指示器有过渡效果
        if (this.currentIndex >= this.slideCount + 1) {
          this.activeIndex = 0;
        } else if (this.currentIndex <= 0) {
          this.activeIndex = this.slideCount-1;
        }
        
      window.setTimeout(() => {
        // 每次过渡结束后都进行一次位置校验
        this.swiperStyle.transition = "0ms";
        if (this.currentIndex >= this.slideCount + 1) {
          // 当翻到最后一张的时候，切换回第一张
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          // 当往第1张前翻时，切换到最后一张
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

        //   图片结束过渡后，当用户需要回调时调用
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },
    /**
     * 操作Dom，在图片列表前后各复制一张图片
     */
    async handleDom() {
      // 获取轮播图容器和轮播图列表
      let swiperEl = document.querySelector(".swiper");
      let slidesEls = swiperEl.getElementsByClassName("slide");

      // 保存轮播图图片个数
      this.slideCount = slidesEls.length;
      // 如果图片个数大于1，那么在列表前后各加上一个silde
      if (this.slideCount > 1) {
        // 克隆第一张
        let cloneFirst = slidesEls[0].cloneNode(true);
        // 克隆最后一张
        let cloneLast = slidesEls[this.slideCount-1].cloneNode(true);
        // 将第一张放在列表最后，最后一张放在列表最前
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        swiperEl.append(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        // 将swiper原有样式赋值给this.swiperStyle，并将对象指向的地址也给它
        this.swiperStyle = swiperEl.style;
      }

      // 让swiper元素，显示第一张图片
      this.setTransform(-this.totalWidth);
    },

    /**
     * 处理手指触摸事件
     */
    touchStart(e) {
      // 当轮播图为正在滚动状态时，不可以拖动
      if (this.scrolling) {
        return;
      }
      // 不在滚动的时候触摸，停止计时器
      this.clearTimer(this.timer);
      // 记录手指开始触摸位置
      this.start = e.touches[0].pageX;
    },
    /**
     * 处理手指移动事件
     */
    touchMove(e) {
      // 记录移动的距离
      this.move = e.touches[0].pageX;

      this.distance = this.move - this.start;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = currentPosition + this.distance;
      // 让图片跟随手指移动
      this.setTransform(moveDistance);
    },
    /**
     * 处理手指离开轮播图事件
     */
    touchEnd(e) {
      // 获取移动距离绝对值
      let currentMove = Math.abs(this.distance);

      // 判断最终距离是否超过图像的25%
      if (this.distance === 0) {
        return;
      } else if (
        this.distance < 0 &&
        currentMove >= this.totalWidth * this.moveRatio
      ) {
        this.currentIndex++;
        this.activeIndex++;
      } else if (
        this.distance > 0 &&
        currentMove >= this.totalWidth * this.moveRatio
      ) {
        this.currentIndex--;
        this.activeIndex--;
      }

      //  移动到正确位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      //  移动完成后开启定时器
      this.startTimer();
    },
    /**
     * 控制上一个，下一个，适合在pc端
     */
    previous: function () {
      this.changeItem(-1);
    },

    next: function () {
      this.changeItem(1);
    },

    changeItem: function (num) {
      // 1.移除定时器
      this.stopTimer();

      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 3.添加定时器
      this.startTimer();
    },
  },
};
</script>

<style scoped>
#swiperBox {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>