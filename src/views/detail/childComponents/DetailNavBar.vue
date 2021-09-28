<template>
  <nav-bar>
    <div slot="left" @click="back">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="titles">
      <div v-for="(title,index) in titles" class="title-item" :class="{active:tabIndex==index}" :key="title"
           @click="titleClick(index)">{{ title }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailTabBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", '参数', '评论', '推荐'],
      tabIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.tabIndex = index
      this.$emit("tabIndex", index)

    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.titles {
  display: flex;
}

.title-item {
  flex: 1;
  font-size: 13px;
}

.active {
  color: var(--color-high-text);
}

img {
  vertical-align: middle;
}
</style>
