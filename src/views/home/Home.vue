<template>
  <div id="home">
    <nav-bar class="home-nav">
     <div slot="center">首页</div>
    </nav-bar>
    <swiper>
      <swiper-item v-for="bannerItem in banners">
        <a :href="bannerItem.link">
          <img :src="bannerItem.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {getHomeMultiData} from "network/home";
import SwiperItem from "components/common/swiper/SwiperItem";
import Swiper from "components/common/swiper/Swiper";
export default {
  name: "Home",
  components:{
    NavBar,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      banners:[],
      recommends:[]
    }
  },
  created() {
    getHomeMultiData().then(({data})=>{
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
