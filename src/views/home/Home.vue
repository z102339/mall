<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <scroll :probe-type="3" ref="scroll" @scroll="scrollChange" class="home-content">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-controll :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-controll>
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
      backTopShow:false
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
  methods: {
    getHomeMultiData() {
      getHomeMultiData().then(({data}) => {
        console.log(data)
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
        // console.log(JSON.stringify(this.goods[type].list,null,2))
      })
    },
    tabClick(index) {
      console.log("currentIndex" + index)
      this.tabIndex = index
    },
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0)
      console.log("backTopClick")
    },

    scrollChange(position){
      this.backTopShow=Math.abs(position.y)>1000
    }

  },
  created() {
    this.getHomeMultiData()
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")
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

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
}

</style>
