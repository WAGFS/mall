// 和首页相关的网络请求封装

import {request} from './request'

export function homeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}