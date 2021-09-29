<template>
  <div id="detail">
    <detail-nav-bar ref="nav-bar" @tabIndex="tabIndex"></detail-nav-bar>
    <scroll class="scroll" ref="scroll" :probe-type="3" @scroll="scrollChange">
      <detail-swiper :banners="banners" @swiperFinish="swiperFinish"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <shop-info :shop-info="shopInfo"></shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoaded"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="detail-param-info" @imageLoad="imageLoaded"></detail-param-info>
      <comment-info :comment-info="commentInfo" ref="comment-info" @imageLoad="imageLoaded"></comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top v-show="showBackTop" @click.native="backToTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
<!--    <toast :message="message" :show="show"></toast>-->
  </div>
</template>

<script>
import {debounce} from "common/utils";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "components/common/toast/Toast";

import DetailNavBar from "views/detail/childComponents/DetailNavBar";
import DetailSwiper from "views/detail/childComponents/DetailSwiper";
import DetailBaseInfo from "views/detail/childComponents/DetailBaseInfo";
import ShopInfo from "views/detail/childComponents/ShopInfo";
import DetailGoodsInfo from "views/detail/childComponents/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComponents/DetailParamInfo";
import CommentInfo from "views/detail/childComponents/CommentInfo";
import DetailBottomBar from "views/detail/childComponents/DetailBottomBar";





import {getDetail, Goods,Shop,GoodsParam,getRecommend} from "network/detail";

import {mapActions} from 'vuex'

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
      commentInfo:{},
      recommends:[],
      quickNav:[0,0,0,0],//商品，参数，评论，推荐快速导航
      swiperHeightReady:false,
      showBackTop:false,
      topImages:null,
      message:undefined,
      show:false

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
    BackTop,
    CommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  methods:{
    imageLoaded() {
      if (this.refresh) {
        this.refresh.call(this.$refs.scroll);
        this.fillQuickNav()
      }

    },
    ...mapActions(['addCart']),
    scrollChange({y}) {
      this.showBackTop=-y>1000
      const navBarCom = this.$refs["nav-bar"]
      navBarCom.tabIndex=0
      if (y<=this.quickNav[1]) {
        navBarCom.tabIndex=1
      }
      if (y<=this.quickNav[2]) {
        navBarCom.tabIndex=2
      }

      if (y<=this.quickNav[3]) {
        navBarCom.tabIndex=3
      }
    },
    backToTop() {
      this.$refs.scroll.scrollTo(0,0)
    },
    swiperFinish() {
      this.swiperHeightReady=true
      this.fillQuickNav()

    },
    fillQuickNav() {
      this.quickNav[1]=this.$refs["detail-param-info"]&&this.$refs["detail-param-info"].$el.offsetTop*-1
      this.quickNav[2]=this.$refs["comment-info"]&&this.$refs["comment-info"].$el.offsetTop*-1
      this.quickNav[3]=this.$refs.recommend&&this.$refs.recommend.$el.offsetTop*-1
    },
    tabIndex(index) {
      this.$refs.scroll&&this.$refs.scroll.scrollTo(0,this.quickNav[index])
    },
    addToCart() {


      let product={}
      product.imgUrl=this.banners[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.newPrice=this.goods.nowPrice
      product.iid=this.iid
      this.addCart(product).then(res=>{
        console.log(this.$toast.$el);
        this.$toast.show(res,2000)
        console.log(this.$toast)
        // this.message=res
        // this.show=true
        // setTimeout(()=>{
        //   this.show=false
        // },2000)
      })
    //  this.$store.dispatch('addCart',product)

      //添加到购物车

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
      if (result.rate.cRate != 0) {
        this.commentInfo=result.rate.list[0]
      }
    })

    getRecommend().then(res=>{
      this.recommends=res.data.list
    })


  },

  mounted() {
    this.refresh=debounce(this.$refs.scroll.refresh,0)
    this.$bus.$on("detailItemImageLoad",()=>{
      this.refresh.call(this.$refs.scroll)
    })
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
  bottom: 58px;
}

</style>
