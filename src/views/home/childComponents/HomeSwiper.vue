<template>
  <swiper>
    <swiper-item v-for="bannerItem in banners" >
      <a :href="bannerItem.link">
        <img :src="bannerItem.image" @load="imageLoaded" alt="">
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
  data() {
    return {
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoaded() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad")
        this.isLoad=true
      }
    }
  }
}
</script>

<style scoped>

</style>
