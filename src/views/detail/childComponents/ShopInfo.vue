<template>
  <div id="shopinfo">
    <div class="shop-main">
      <img :src="shopInfo.logo" alt="">
      <span>{{ shopInfo.name }}</span>
    </div>

    <div class="shop-body">
      <div class="body-left">
        <div class="vertical">
          <div class="ft-16">{{ sells }}</div>
          <div class="mt-5">总销量</div>
        </div>
        <div class="vertical">
          <div class="ft-16">{{ shopInfo.goodsCount }}</div>
          <div class="mt-5">全部宝贝</div>
        </div>
      </div>
      <div class="body-right">
        <table>
          <tr v-for="score in shopInfo.score">
            <td>{{ score.name }}</td>
            <td :style="{color:score.isBetter?'#4f902d':'#f00'}">{{ score.score }}</td>
            <td :style="{color:'#fff',backgroundColor:score.isBetter?'#4f902d':'#ff0000'}">
              {{ score.isBetter ? "高" : "低" }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div style="text-align: center;margin-top: 10px;padding-bottom: 30px;">
      <span style="background:#F1F5FA;padding: 5px 40px;border-radius: 5px">进店逛逛</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    sells() {
      return ((this.shopInfo.sells) / 10000).toFixed(2) + "万"
    }
  }
}
</script>

<style scoped>

#shopinfo {
  border-top: 5px solid #f8f8f8;
  border-bottom: 5px solid #f8f8f8;
  padding-top: 30px;
}

.shop-main {
  margin-left: 5px;
}

.shop-main span {
  vertical-align: middle;
  margin-left: 10px;
}

.shop-main img {
  width: 44px;
  height: 44px;
  vertical-align: middle;
  border: 2px solid #eee;
  border-radius: 50%;
}

.shop-body {
  display: flex;
  align-items: center;
}

.mt-5 {
  margin-top: 10px;
  color: #000;
  font-size: 16px;
}

.ft-16 {
  font-size: 20px;
  color: #000000;
}

.vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.body-left {
  flex: 1;
  display: flex;
  border-right: 1px solid #bbb;
  justify-content: space-evenly;
}

table {
  margin-left: auto;
  border-spacing: 15px;
  color: #000;
  /*border-collapse: separate;*/
}

.body-right {
  flex: 1;
}


.bgLow {

}

.low {

}
</style>
