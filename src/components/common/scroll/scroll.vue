<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            scroll:null
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted() {
        setTimeout(()=>{
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad
            })

            this.scroll.on('scroll',(position)=>{
                this.$emit('scroll',position)
            })

            // 监听上拉加载更多事件
            this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp')
            })
        },2000)
    },
    methods: {
        scrollTo(x,y,time=300){
            this.scroll.scrollTo(x,y,time);
        },
        finish(){
            this.scroll.finishPullUp()
        }
    },
}
</script>
<style scoped>

</style>