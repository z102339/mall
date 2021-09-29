import {ADD_TO_CART,ADD_COUNTER} from "./mutation-types";
export default {
  addCart({state,commit}, payload) {
    let product = state.cartList.find(item => item.iid === payload.iid)
    if (product) {
      commit(ADD_COUNTER,product)
    } else {
      payload.count=1
      payload.checked=true
      commit(ADD_TO_CART,payload)
    }
  }
}
