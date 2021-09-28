<template>
  <swiper>
    <swiper-item class="swiper-item" v-for="bannerItem in banners" :key="bannerItem">
        <img :src="bannerItem"  alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "components/common/swiper/Swiper";
import SwiperItem from "components/common/swiper/SwiperItem";
export default {
  name: "DetailSwiper",
  props:{
    banners:{
      type:Array,
      default:[]
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>

  .swiper-item{
    height: 300px;
    overflow: hidden;
  }

</style>
