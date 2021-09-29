<template>

  <div v-if="Object.keys(goods).length!==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div>
      <span class="real-price">{{goods.newPrice}}</span>
      <span class="old-price" v-show="goods.oldPrice">{{goods.oldPrice}}</span>
      <span class="discount-info" v-show="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="column">
      <span v-for="column in goods.columns">{{column}}</span>
    </div>
    <div class="services">
      <div v-for="service in goods.services">
        <img :src="service.icon" alt="">
        <span>{{service.name}}</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "DetailBaseInfo",
  props:{
    goods:{
      type:Object,
      default:{}
    }
  }
}
</script>

<style scoped>

  .base-info{
    padding: 0 5px;
  }


  .info-title{
    color: #000;
    font-weight: bold;
    padding: 10px 0px;
    font-size: 16px;
  }
  .real-price{
    color: var(--color-high-text);
    font-size: 20px;
  }

  .old-price{
    text-decoration: line-through;
    font-size: 13px;
    margin-left: 5px;
  }

  .discount-info{
    color: #fff;
    background: #ff5777;
    padding: 1px 6px;
    font-size: 12px;
    margin-left: 5px;
    vertical-align: top;
    border-radius: 7px;
  }

  .column{
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    font-size: 13px;
    color: #999;
    border-bottom: 1px solid #eee;
  }

  .services{
    display: flex;
    font-size: 13px;
    color: #000;
    padding-top: 20px;
    margin-bottom: 25px;
    justify-content: space-between;
  }

  .services img{
    width: 12px;
    /*vertical-align: middle;*/
  }

  .services span{
    vertical-align: 1px;
    /*vertical-align: middle;*/
  }

</style>
