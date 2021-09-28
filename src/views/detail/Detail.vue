<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="scroll" ref="scroll" :probe-type="3" @scroll="scrollChange">
      <detail-swiper :banners="banners"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <shop-info :shop-info="shopInfo"></shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoaded"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>
    <back-top v-show="showBackTop" @click.native="backToTop"></back-top>

  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import DetailNavBar from "views/detail/childComponents/DetailNavBar";
import DetailSwiper from "views/detail/childComponents/DetailSwiper";
import DetailBaseInfo from "views/detail/childComponents/DetailBaseInfo";
import ShopInfo from "views/detail/childComponents/ShopInfo";
import DetailGoodsInfo from "views/detail/childComponents/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComponents/DetailParamInfo";

import {debounce} from "common/utils";


import {getDetail, Goods,Shop,GoodsParam} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: undefined,
      banners: [],
      goods: {},
      shopInfo: {},
      detailInfo:{},
      refresh:undefined,
      paramInfo:{},
      showBackTop:false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    ShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    BackTop
  },
  methods:{
    imageLoaded() {
      this.refresh&&this.refresh.call(this.$refs.scroll);
    },
    scrollChange({y}) {
      this.showBackTop=-y>1000
    },
    backToTop() {
      this.$refs.scroll.scrollTo(0,0)
    }

  },
  created() {



    this.iid = this.$route.params.id
    getDetail(this.iid).then(res => {
      const result = res.result
      this.banners = result.itemInfo.topImages
      this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)
      this.shopInfo = new Shop(result.shopInfo)
      this.detailInfo=result.detailInfo
      this.paramInfo=new GoodsParam(result.itemParams.info,result.itemParams.rule)
      console.log(this.goods)
    })
  },

  mounted() {
    this.refresh=debounce(this.$refs.scroll.refresh,0)
  }

}
</script>


<style scoped>
#detail {
  position: relative;
  z-index: 2;
  background: #fff;
  height: 100vh;
}


.scroll {
  position: absolute;
  top: 44px;
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
}

</style>
