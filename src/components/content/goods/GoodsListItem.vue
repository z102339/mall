<template>
  <div class="goodsItem">
    <img :src="goodsItem.show.img" alt="">
    <div class="goodsInfo">
      <p class="goodsTitle">{{goodsItem.title}}</p>
    <span class="goodsPrice">{{goodsItem.price}}</span>
<!--      <img src="~assets/img/common/collect.svg" alt="">-->
      <span class="goodsFav">{{goodsItem.cfav}}</span>

    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .goodsItem{
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .goodsItem>img{
    width: 100%;
    border-radius: 5px;
    vertical-align: middle;
  }

  .goodsInfo{
    font-size: 12px;
    margin: 5px 0;
    text-align: center;
  }

  .goodsInfo p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 3px;
  }

  .goodsPrice{
    color: var(--color-high-text);

    font-size: 12px;

  }

  .goodsFav{
    margin-left: 5px;
  }

  /*.goodsInfo img{*/
  /*  width: 12px;*/
  /*  height: 12px;*/
  /*  vertical-align: -10px;*/
  /*}*/

  /*.goodsPrice{*/
  /*  vertical-align: middle;*/
  /*}*/

  /*.goodsFav{*/
  /*  vertical-align: middle;*/
  /*}*/

  .goodsFav::before{
    content: "";
    display: inline-block;
    width: 12px;
    height:12px;
    vertical-align: -1px;
    background: url("~assets/img/common/collect.svg");
    background-size: 12px;

  }



  .goodsTitle{

  }


</style>
