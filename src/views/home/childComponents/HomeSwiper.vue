<template>
  <swiper>
    <swiper-item v-for="bannerItem in banners">
      <a :href="bannerItem.link">
        <img :src="bannerItem.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
  name: "HomeSwiper",
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

</style>
