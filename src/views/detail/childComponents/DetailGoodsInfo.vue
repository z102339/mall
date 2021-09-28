<template>
  <div v-if="Object.keys(detailInfo).length!=0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imageLoaded" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default: {}
    }
  },
  methods:{
    imageLoaded() {
      this.$emit("imageLoad")
    }
  }
}
</script>

<style scoped>

  .goods-info{
    padding-bottom: 20px;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc{
    margin: 15px;
  }

  .start{
    height: 5px;
  }
  .start::before{
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    vertical-align: top;
    background: #000;
  }
  .start::after{
    content: "";
    display: inline-block;
    width: 100px;
    vertical-align: top;
    height: 5px;
    border-bottom: 1px solid black;
  }

  .end{
    float: right;
    height: 5px;
  }

  .end::before{
    content: "";
    display: inline-block;
    width: 100px;
    height: 5px;
    vertical-align: top;
    border-bottom: 1px solid black;
  }

  .end::after{
    content: "";
    display: inline-block;
    vertical-align: top;
    width: 5px;
    height: 5px;
    background: #000;
  }

  .desc{
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .info-key{
    margin-left: 15px;
    margin-bottom: 10px;
  }

  img{
    width: 100%;
    vertical-align: middle;
  }


</style>
