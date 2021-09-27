<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :banners="banners"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComponents/DetailNavBar";
import DetailSwiper from "views/detail/DetailSwiper";

import {getDetail} from "network/detail";
export default {
  name: "Detail",
  data(){
    return {
        iid:undefined,
        banners:[]
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper
  },
  created() {
    console.log("created")
    this.iid=this.$route.params.id
    getDetail(this.iid).then(res=>{
      this.banners=res.result.itemInfo.topImages
      console.log(res)
    })
  }
}
</script>


<style scoped>

</style>
