import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)
const store = new VueX.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      let product = state.cartList.find(item => item.iid === payload.iid)
      if (product) {
        product.count++
      } else {
        state.cartList.push(payload)
      }
    }
  }
})

export default store
