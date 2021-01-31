import { debounce } from "./utils";

export const mixins = {
  data() {
    return {
      refresh: null,
      itemImgLoad:function(){}
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgLoad = () => {
      this.refresh();
    }
    this.$bus.$on("itemImgLoad", this.itemImgLoad);
  },
}
