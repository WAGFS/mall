<template>
    <div v-if="Object.keys(goods).length !== 0" class="base-info">
        <div class="info-title">{{goods.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
        </div>
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length - 1].name}}</span>
        </div>
        <div class="info-service">
            <span class="info-service-item" v-for="item in goods.services.length-1" :key="item">
                <img :src="goods.services[item - 1].icon" alt="">
                <span>{{goods.services[item - 1].name}}</span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>
.base-info{
    padding: 10px;
    background: #fff;
}
.info-title{
    font-size: 18px;
}
.info-price{
    padding: 5px 0;
    margin: 5px 0;
}
.n-price{
    color: var(--color-high-text);
    font-size: 18px;
}
.o-price{
    margin: 0 5px;
    font-size: 12px;
    text-decoration: line-through;
    color: #999;
}
.discount{
    background: var(--color-tint);
    padding: 2px  3px;
    border-radius: 8px;
    overflow: hidden;
    font-size: 13px;
    color: #fff;
}
.info-other{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin: 10px 0;
    padding:5px 0;
    border-bottom:2px solid #eee;
    color: #999;
}
.info-service{
    height: 60px;
    margin: 0 -10px;
    padding: 0 10px;
    justify-content: space-between;
    display: flex;
    border-bottom: 5px solid #f2f5f8;
}
.info-service-item {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
}
.info-service-item img{
    width: 12px;
}
</style>