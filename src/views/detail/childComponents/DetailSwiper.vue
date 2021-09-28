<template>
  <swiper>
    <swiper-item class="swiper-item" v-for="bannerItem in banners" :key="bannerItem">
        <img :src="bannerItem" @load="imageLoad"   alt="">
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
  data() {
    return {
      isLoaded:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad() {
      if (!this.isLoaded) {
        this.isLoaded=true
        this.$emit("swiperFinish")
      }
    }
  }
}
</script>

<style scoped>

  .swiper-item{
    height: 300px;
    overflow: hidden;
  }

</style>
