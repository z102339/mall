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
  data() {
    return {
      bScroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.bScroll && this.bScroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.bScroll && this.bScroll.finishPullUp()
    },
    refresh() {
      this.bScroll && this.bScroll.refresh()
    }
  },
  mounted() {
    this.bScroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    this.bScroll.on('scroll', position => {
      this.$emit("scroll", position)
    })

    if (this.pullUpLoad) {
      this.bScroll.on('pullingUp', () => {
        this.$emit("loadMore")
      });
    }
  }
}
</script>

<style scoped>

</style>
