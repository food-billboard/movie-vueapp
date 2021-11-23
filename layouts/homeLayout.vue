<template>
  <div id="movie-home-wrapper">
    <main class="main">
      <nuxt />
    </main>
    <footer>
      <van-tabbar v-model="activeBar" @change="handleChange">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search">我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>
<script>
import { HOME_MENU } from '../middleware/auth'
export default {
  data() {
    return {
      activeBar: 0
    }
  },
  watch: { 
    "$route" () {
      this.onRouteChange()
    }
  },
  created() {
    this.onRouteChange()
  },
  methods: {
    handleChange() {
      const { name } = this.$route
      switch(this.activeBar) {
        case 0:
          if(name !== "home") this.$router.push({
            path: "/home"
          })
          break 
        case 1:
          if(name !== "mine") this.$router.push({
            path: "/mine"
          })
          break 
      }
    },
    isHomeQuery() {
      const { fullPath } = this.$route
      return HOME_MENU.indexOf(fullPath)
    },
    onRouteChange() {
      const index = this.isHomeQuery()
      if(~index) {
        this.activeBar = index 
      }
    }
  }
}
</script>
<style lang="less" scoped>
  #movie-home-wrapper {
    background-color: #f4f4f4;
    min-height: 100vh;
    .main {
      margin-bottom: 50px;
    }
  }
</style>