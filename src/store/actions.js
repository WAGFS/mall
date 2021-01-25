import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_ALL_CHECKED
} from './mutations-type'


export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      try {
        let oldProduction = context.state.cartList.find(item => item.iid === payload.iid);
        if (oldProduction) {
          context.commit(ADD_COUNTER, oldProduction)
          resolve('购物车内商品数量+1')
        } else {
          context.commit(ADD_TO_CART, payload)
          resolve('加入成功')
        }
      } catch (err) {
        reject('加入购物车失败')
      }
    })
  },
  changeAllChecked({
    state,
    commit
  }, payload) {
    let newCartList = state.cartList.map(item => {
      item.checked = !payload
      return item;
    });
    commit(CHANGE_ALL_CHECKED, newCartList)
  }
}
