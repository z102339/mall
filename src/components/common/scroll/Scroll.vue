<template>
  <div class="wrapper" ref="wrapper">
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
  mounted() {
    this.bScroll=new BScroll(this.$refs.wrapper,)
  }
}
</script>

<style scoped>

</style>
