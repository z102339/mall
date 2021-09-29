export default {
  cartCount(state) {
    console.log("cartCount............")
    return state.cartList.filter(item=>item.checked).reduce((prev,current)=>{
      return prev+current.count
    },0)
  },
  cartList(state) {
    return state.cartList
  }
}
