<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
    <cart-list class="cart-list" :cart-list="cartList" ref="cart-list"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComponents/CartList'
  import BottomBar from './childComponents/BottomBar'

  import {mapGetters} from 'vuex'
	export default {
		name: "Cart",
    components: {
		  NavBar,
      CartList,
      BottomBar
    },
    computed: {
		  ...mapGetters(['cartList','cartCount'])
    }
  }
</script>

<style scoped>
  #cart {
    position: relative;
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: calc(44px + 49px);
    width: 100%;
  }
</style>
