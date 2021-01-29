import {
  request
} from './request'

export function category() {
      return request({
          url:'/category'
      })
}
