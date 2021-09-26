<template>
<div class="recommends">
  <div v-for="recommend in recommends" class="recommend-item">
    <a :href="recommend.link">
      <img :src="recommend.image">
      <div>{{recommend.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: "RecommendView",
  props:{
    recommends:{
      type:Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
  .recommends{
    display: flex;
    margin-top: 10px;
    padding-bottom: 20px;
    border-bottom: 10px solid #eee;
  }


  .recommend-item{
    text-align: center;
    font-size: 12px;
    flex: 1;
  }

  .recommend-item a{
    width: 100%;
    height: 100%;
    display: inline-block;
  }

  .recommend-item img{
    vertical-align: middle;
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
  }

</style>
