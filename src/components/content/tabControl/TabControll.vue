<template>
  <div class="tab-control">
    <div v-for="(title,index) in titles"  class="tab-control-item" @click="onClick(index)" :class="{active:currentIndex==index}">
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControll",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    },

  },
  data() {
    return {
      currentIndex:0
    }
  },
  methods:{
    onClick(index){
      this.currentIndex!=index&&(this.currentIndex=index)
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>

  .tab-control{
    display: flex;
    font-size: 14px;
    line-height: 40px;
    height: 40px;
    top: 0px;
    background: #fff;
    text-align: center;
  }

  .tab-control-item{
      flex: 1;
  }

  .tab-control .active{
    color: hotpink;
  }

  .active>span{
    padding: 5px;
    border-bottom: 3px solid hotpink;
  }

</style>
