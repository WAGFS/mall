<template>
  <div class="toast" v-show="isShow">
    {{ message }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message = "", duration = 2000) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    },
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  color: #fff;
  text-align: center;
  padding: 8px 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>