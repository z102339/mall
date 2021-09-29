import {ADD_TO_CART, ADD_COUNTER} from "./mutation-types";

export default {
  addCart({state, commit}, payload) {
    return new Promise((resolve, reject) => {
      let product = state.cartList.find(item => item.iid === payload.iid)
      if (product) {
        commit(ADD_COUNTER, product)
        resolve("商品数量+1")
      } else {
        payload.count = 1
        payload.checked = true
        commit(ADD_TO_CART, payload)
        resolve("添加商品成功")
      }
    })
  }
}
