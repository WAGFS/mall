<template>
    <div class="detail-comment" v-if="commentList.length !== 0">
        <div class="user-comment">
            <span>用户评价</span>
            <span>更多</span>
        </div>
        <div class="user-card" v-for="(item,index) in commentList" :key="index">
            <div class="userInfo">
                <img :src="item.user.avatar">
                <span>{{item.user.uname}}</span>
            </div>
            <div class="comment">
                {{item.content}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        commentList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    mounted() {
       setTimeout(()=>{
            console.log(this.commentList)
       },1000)
    },
}
</script>
<style scoped>
.detail-comment{
    padding: 10px;
}
.user-comment{
    padding: 10px 10px 10px 0 ;
    border-bottom: 2px solid #f2f5f8;
    font-size: 14px;
    color: #333;
    display: flex;
    justify-content: space-between;
}
.user-card{
    padding: 15px 0;
}
.userInfo {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    padding-bottom: 15px;
}
.userInfo img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
}
.comment{
    font-size: 14px;
    letter-spacing: 0.1em;
}
</style>