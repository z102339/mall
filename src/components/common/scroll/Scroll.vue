<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  data(){
    return {
      bScroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    }
  },
  methods:{
    scrollTo(x, y, time = 300) {
      this.bScroll.scrollTo(x,y,time)
    }
  },
  mounted() {
    this.bScroll=new BScroll(this.$refs.wrapper,{
      click:true,
      probeType: this.probeType
    })
    this.bScroll.on('scroll',position=>{
      // console.log(position)
      this.$emit("scroll",position)
    })
  }
}
</script>

<style scoped>

</style>
