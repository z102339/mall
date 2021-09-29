<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view class="app-top"></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";


export default {
  name: 'app',
  components:{
    MainTabBar
  }
}
</script>

<style>
@import "./assets/css/base.css";
[v-cloak]{
  display: none;
}

#app{
  /*display: flex;*/
  /*flex-direction: column;*/
  /*height: 100vh;*/
}

/*.app-top{*/
/*  height: calc(100% - 49px);*/
/*}*/

</style>
