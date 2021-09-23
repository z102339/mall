<template>
  <div id="hy-swiper">
    <div class="swiper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animationDuration: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      slideCount: 0,
      swiperStyle: {},
      totalWidth: 0,
      currentIndex: 1
    }
  },
  mounted() {
    setTimeout(_ => {
      this.handleDom()
      this.startPlay()
    }, 3000)
  },
  methods: {
    handleDom() {
      const swiperEl = document.querySelector('.swiper')
      const slideEls = swiperEl.getElementsByClassName('slide')
      this.slideCount = slideEls.length
      if (this.slideCount > 1) {
        const cloneFirst = slideEls[0].cloneNode(true)
        const cloneLast = slideEls[this.slideCount - 1].cloneNode(true)
        swiperEl.insertBefore(cloneLast, slideEls[0])
        swiperEl.appendChild(cloneFirst)
        this.totalWidth = swiperEl.offsetWidth
        this.swiperStyle = swiperEl.style
        this.setTransform(-this.totalWidth)
      }
    },

    startPlay() {
      console.log("startPlay")
      this.intervalClearId = setInterval(_ => {


        this.currentIndex++

        this.scrollContent(this.currentIndex)
        if(this.currentIndex==this.slideCount+1){
          console.log("倒数第一张动画完毕")
          setTimeout(()=>{
            this.currentIndex=1
            this.swiperStyle.transition="0ms"
            this.setTransform(-this.totalWidth)
          },this.animationDuration)

        }


      }, this.interval)
    },
    setTransform(transitionX) {
      this.swiperStyle.transform = `translate3d(${transitionX}px, 0, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${transitionX}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${transitionX}px), 0, 0`;
    },

    fixPosition() {
      if (this.currentIndex == this.slideCount + 1) {
        console.log("优化到第一张了")
        this.currentIndex = 0
      }
    },

    scrollContent(targetIndex) {
      this.swiperStyle.transition = `transform ${this.animationDuration}ms`
      this.setTransform(-targetIndex * this.totalWidth)
    },


    stopPlay() {
      clearInterval(this.intervalClearId)
    }

  }
}
</script>

<style scoped>

#hy-swiper {
  position: relative;
  overflow: hidden;
}

.swiper {
  display: flex;
}

</style>
