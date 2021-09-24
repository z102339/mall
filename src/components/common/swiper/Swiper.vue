<template>

  <div id="hy-swiper">

    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator&&slideCount >1">
        <div v-for="(item,index) in slideCount" class="indi-item" :class="{active:index==currentIndex-1}"
             :key="index"></div>
      </slot>
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
      default: 500
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      slideCount: 0,
      swiperStyle: {},
      totalWidth: 0,
      currentIndex: 1,
      isScrolling: false,
      isStart: false
    }
  },
  mounted() {
    setTimeout(_ => {
      this.handleDom()
      this.isStart = true
      this.startPlay()
    }, 1000)
  },
  methods: {
    touchStart(event) {
      if (this.isScrolling || !this.isStart) {
        return
      }
      ;
      this.stopPlay()
      this.downX = event.touches[0].pageX;
    },
    touchMove(event) {
      if (this.isScrolling || !this.isStart) {
        return
      }
      this.offsetX = event.touches[0].pageX - this.downX;
      this.swiperStyle.transition = ""
      this.setTransform(-this.currentIndex * this.totalWidth + this.offsetX)
    },
    touchEnd() {
      if (this.isScrolling || !this.isStart) {
        return
      }
      if (Math.abs(this.offsetX) > this.totalWidth * 0.1) {
        if (this.offsetX > 0) {
          this.currentIndex--;
          this.scrollContent(this.currentIndex)
        } else {
          this.currentIndex++
          this.scrollContent(this.currentIndex)
        }
      } else {
        this.scrollContent(this.currentIndex);
      }
      this.startPlay()
    },
    handleDom() {
      const swiperEl = document.querySelector('.swiper')
      this.transitionCallback = () => {
        this.swiperStyle.transition = ""
        this.isScrolling = false
        if (this.resetFirst) {
          this.setTransform(-this.totalWidth)
          this.resetFirst = false
        } else if (this.resetLast) {
          this.setTransform(-this.currentIndex * this.totalWidth)
          this.resetLast = false
        }
      }
      swiperEl.removeEventListener("transitionend", this.transitionCallback, false)
      swiperEl.addEventListener("transitionend", this.transitionCallback, false)
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
      this.intervalClearId && clearInterval(this.intervalClearId)
      this.intervalClearId = setInterval(_ => {
        this.currentIndex++
        this.scrollContent(this.currentIndex)
      }, this.interval)
    },
    setTransform(transitionX) {
      this.swiperStyle.transform = `translate3d(${transitionX}px, 0, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${transitionX}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${transitionX}px), 0, 0`;
    },
    scrollContent(targetIndex) {
      this.isScrolling = true
      this.swiperStyle.transition = `transform ${this.animationDuration}ms`
      this.setTransform(-targetIndex * this.totalWidth)
      if (targetIndex == this.slideCount + 1) {
        this.currentIndex = 1
        this.resetFirst = true
      } else if (targetIndex == 0) {
        this.currentIndex = this.slideCount
        this.resetLast = true
      }
    },

    stopPlay() {
      clearInterval(this.intervalClearId)
    }

  }
}
</script>

<style scoped>

#hy-swiper {
  /*margin: 10px 14px;*/
  position: relative;
  overflow: hidden;
  /*border-radius: 10px;*/

}


.swiper {
  display: flex;
}

.indicator {
  position: absolute;
  display: flex;
  justify-content: center;
  left: 0;
  right: 0;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.active {
  background-color: #f00;
}

</style>
