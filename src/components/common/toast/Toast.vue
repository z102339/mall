<template>
  <div class="toast" v-show="isShow">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props:{
    // message:{
    //   type:String,
    //   default:''
    // },
    // show:{
    //   type:Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message, duration) {
      this.isShow=true
      this.message=message
      setTimeout(_=>{
          this.isShow=false
      },duration)
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 999;
    padding: 8px 10px;
    color: #fff;
    background-color: rgba(0,0,0,0.5);
  }

</style>
