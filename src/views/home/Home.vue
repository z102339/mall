<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <tab-controll :titles="['流行','新款','精选']" :current-index="tabIndex" @tabClick="tabClick" ref="tabControl" class="tabControl" v-show="showTopTabControl"></tab-controll>
    <scroll :pull-up-load="true"  :probe-type="3" ref="scroll" @loadMore="loadMore" @scroll="scrollChange" class="home-content" >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-controll :titles="['流行','新款','精选']" :current-index="tabIndex" @tabClick="tabClick" ref="tabControl"></tab-controll>
      <goods-list :goods="goodsList"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="backTopShow" ></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComponents/HomeSwiper";
import RecommendView from "views/home/childComponents/RecommendView";
import FeatureView from "views/home/childComponents/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControll from "components/content/tabControl/TabControll";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import {debounce} from "common/utils";

import {getHomeMultiData, getHomeGoods} from "network/home";



export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControll,
    GoodsList,
    Scroll,
    BackTop

  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []}
      },
      tabIndex: 0,
      backTopShow:false,
      tabControlHeight:0,
      showTopTabControl:false,
      scrollY:0
    }
  },

  computed: {
    goodsList() {
      switch (this.tabIndex) {
        case 0:
          return this.goods.pop.list
        case 1:
          return this.goods.new.list
        case 2:
          return this.goods.sell.list
      }
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.scrollY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.scrollY=this.$refs.scroll.bScroll.y

  },
  methods: {
    getHomeMultiData() {
      getHomeMultiData().then(({data}) => {
        this.banners = data.banner.list
        this.recommends = data.recommend.list
      }).catch(reason => {

      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].page++
        this.goods[type].list.push(...res.data.list)
        this.$refs.scroll.finishPullUp();
      })
    },
    tabClick(index) {
      this.tabIndex = index
    },
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0)
    },

    scrollChange(position){
      this.backTopShow=Math.abs(position.y)>1000
      if (Math.abs(position.y) >= this.tabControlHeight) {
        this.showTopTabControl=true
      }else{
        this.showTopTabControl=false
      }
    },


    loadMore(){
      let type=undefined
      if (this.tabIndex == 0) {
        type="pop"
      }else if (this.tabIndex == 1) {
        type='new'
      }else if (this.tabIndex == 2) {
        type="sell"
      }
      this.getHomeGoods(type);
    },

    swiperImageLoad() {
      this.tabControlHeight=this.$refs.tabControl.$el.offsetTop
    }


  },
  created() {
    this.getHomeMultiData()
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")

  },
  mounted() {

    const refresh=debounce.call(this.$refs.scroll,this.$refs.scroll.refresh,0)
    this.$bus.$on("itemImageLoad",()=>{
      // this.$refs.scroll.refresh()
      refresh()
    })
  }


}
</script>

<style scoped>

#home {
  /*padding-top: 44px;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  height: 100vh;
  position: relative;
}

.home-content {
  /*height: calc(100% - 44px);*/
  /*height: 300px;*/
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  /*overflow: scroll;*/
  /*flex: 1;*/
}

.tabControl{
  position: relative;
  z-index: 2;
}


.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 1;*/
}

</style>
