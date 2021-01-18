<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="(item,index) in imgList" :key="index">
            <img :src="item" class="imgs" @load="imgLoaded">
        </swiper-item>
    </swiper>
</template>
<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        imgList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            isLoaded:false
        }
    },
    methods: {
        imgLoaded(){
            if(!this.isLoaded){
                this.$emit('imgLoaded');
                this.isLoaded = true
            }
        }
    },
}
</script>
<style scoped>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
</style>