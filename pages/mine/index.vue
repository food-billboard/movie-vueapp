<template>
  <div
    class="main-page"
  >
    <mine-header />
    <mine-info />
  </div>
</template>
<script>
import MineHeader from './components/header.vue'
import MineInfo from './components/info.vue'
export default {
  components: {
    MineHeader,
    MineInfo
  },
  layout: "homeLayout",

}
</script>
<style lang="less" scoped>
  .main-page {
    height: calc(100vh - 50px);
  }
</style>