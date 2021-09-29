import Vue from 'vue'
import VueX from 'vuex'
import mutations from './mutations'
import actions from "./actions";
import getters from "./getters";
Vue.use(VueX)
const state={
  cartList:[]
}
const store = new VueX.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
