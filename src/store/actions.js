import {
    ADD_COUNTER,
    ADD_TO_CART
  } from './mutations-type'
  

export default {
  addCart(context, payload) {
    let oldProduction = context.state.cartList.find(item => item.iid === payload.iid);
    if (oldProduction) {
      context.commit(ADD_COUNTER, oldProduction)
    } else {
      context.commit(ADD_TO_CART, payload)
    }
  }
}
