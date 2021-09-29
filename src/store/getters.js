export default {
  cartCount(state) {
    return state.cartList.filter(item=>item.checked).reduce((prev,current)=>{
      return prev+current.count
    },0)
  },
  cartList(state) {
    return state.cartList
  }
}
