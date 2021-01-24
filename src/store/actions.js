import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_ALL_CHECKED
} from './mutations-type'


export default {
  addCart(context, payload) {
    let oldProduction = context.state.cartList.find(item => item.iid === payload.iid);
    if (oldProduction) {
      context.commit(ADD_COUNTER, oldProduction)
    } else {
      context.commit(ADD_TO_CART, payload)
    }
  },
  changeAllChecked({
    state,
    commit
  },payload) {
    let newCartList = state.cartList.map(item => {
      item.checked = !payload
      return item;
    });
    commit(CHANGE_ALL_CHECKED, newCartList)
  }
}
