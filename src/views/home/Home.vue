<template>
  <div id="home">
    <nav-bar class="home-nav">
     <div slot="center">首页</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>


  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {getHomeMultiData} from "network/home";
import HomeSwiper from "./childComponents/HomeSwiper";
import RecommendView from "views/home/childComponents/RecommendView";


export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,

  },
  data() {
    return {
      banners:[],
      recommends:[]
    }
  },
  created() {
    getHomeMultiData().then(({data})=>{
      console.log(data)
      this.banners=data.banner.list
      this.recommends=data.recommend.list
    }).catch(reason => {

    })
  }
}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }

</style>
