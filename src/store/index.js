import Vue from 'vue'
import VueX from 'vuex'
import mutations from './mutations'
import actions from "./actions";
Vue.use(VueX)
const state={
  cartList:[]
}
const store = new VueX.Store({
  state,
  mutations,
  actions
})

export default store
