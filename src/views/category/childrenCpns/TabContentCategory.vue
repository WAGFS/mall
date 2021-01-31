<template>
    <div class="category-content" v-if="Object.keys(subCategory).length !== 0">
        <a :href="item.link" v-for="(item,index) in subCategory.list" :key="index" class="category-content-item">
            <img v-lazy="item.image" alt="">
            <span>{{item.title}}</span>
        </a>
    </div>
</template>
<script>
export default {
    props:{
        subCategory:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>
.category-content{
    width: 100%;
    display: flex;
    background: #fff;
    flex-wrap: wrap;
}
.category-content-item{
    width: 33.3333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-size: 13px;
}
.category-content-item img{
    width: 100%;
    transform: scale(0.7);
}
</style>