<template>
    <div class="tabControl">
        <div v-for="(item,index) in title" :key="item" class="tabControl-item" :class="{active:index===currentIndex}" @click="changeIndex(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            currentIndex:0
        }
    },
    methods: {
        changeIndex(index){
            this.currentIndex = index;
            this.$emit('tabClick',index);
        }
    },
}
</script>
<style scoped>
.tabControl{
    height: 40px;
    display: flex;
    font-size: 15px;
    text-align: center;
    line-height: 40px;
}
.tabControl-item{
    flex: 1;
}
.tabControl-item span{
    padding: 5px;
}
.active{
    color: var(--color-high-text);
}
.active span{
    border-bottom: 3px solid var(--color-high-text);
}
</style>