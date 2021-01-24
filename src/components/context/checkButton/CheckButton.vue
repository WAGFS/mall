<template>
    <button class="check-button" :class="{active:isChecked}">
        <img src="~assets/img/cart/tick.svg">
    </button>
</template>
<script>
export default {
    props:{
        isChecked:{
            type:Boolean,
            default:true
        }
    }
}
</script>
<style scoped>
.check-button{
    background: #fff;
    border-radius: 50%;
    overflow: hidden;
    width: 20px;
    height: 20px;
    border: 2px solid #aaa;
}
.active{
    background: red;
    border-color: #f00;
}
</style>