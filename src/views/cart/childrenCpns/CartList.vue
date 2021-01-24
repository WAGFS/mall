<template>
    <div class="cartList">
        <scroll class="content" ref="cartScroll">
            <cart-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-item>
        </scroll>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'

import Scroll from 'components/common/scroll/scroll.vue'
import CartItem from './CartItem.vue'

export default {
  components: { Scroll,CartItem },
    computed:{
        ...mapGetters(['cartList'])
    },
    activated() {
        this.$refs.cartScroll.refresh();
    },
}
</script>
<style scoped>
.cartList{
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
}
.content{
    height: 100%;
    width: 100vw;
}
</style>