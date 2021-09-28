<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="scroll" ref="scroll">
      <detail-swiper :banners="banners"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <shop-info :shop-info="shopInfo"></shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoaded"></detail-goods-info>
      <ul>
        <li>item1</li>
        <li>item2</li>
        <li>item3</li>
        <li>item4</li>
        <li>item5</li>
        <li>item6</li>
        <li>item7</li>
        <li>item8</li>
        <li>item9</li>
        <li>item10</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import DetailNavBar from "views/detail/childComponents/DetailNavBar";
import DetailSwiper from "views/detail/childComponents/DetailSwiper";
import DetailBaseInfo from "views/detail/childComponents/DetailBaseInfo";
import ShopInfo from "views/detail/childComponents/ShopInfo";
import DetailGoodsInfo from "views/detail/childComponents/DetailGoodsInfo";

import {debounce} from "common/utils";


import {getDetail, Goods,Shop} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: undefined,
      banners: [],
      goods: {},
      shopInfo: {},
      detailInfo:{},
      refresh:undefined
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    ShopInfo,
    DetailGoodsInfo
  },
  methods:{
    imageLoaded() {
      this.refresh&&this.refresh.call(this.$refs.scroll);
    }
  },
  created() {

    console.log("created")

    this.iid = this.$route.params.id
    getDetail(this.iid).then(res => {
      const result = res.result
      this.banners = result.itemInfo.topImages
      this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)
      this.shopInfo = new Shop(result.shopInfo)
      this.detailInfo=result.detailInfo
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
