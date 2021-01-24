import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_ALL_CHECKED
} from './mutations-type'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  },
  [CHANGE_ALL_CHECKED](state,payload){
    state.cartList = payload;
  }
}
