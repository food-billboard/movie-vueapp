<template>
  <div id="movie-wrapper" :class="`${realColorClass}-wrapper`">
    <main :class="[
      'main',
      'bgColor',
      'background-color',
      realColorClass
    ]">
      <nuxt />
    </main>
  </div>
</template>
<script>
import layoutMixin from '@/mixins/layout'
export default {
  mixins: [
    layoutMixin
  ]
}
</script>
<style lang="less" scoped>
@import url("/assets/global.less");
#movie-wrapper {
  background-color: #f4f4f4;
  min-height: 100vh;
}
</style>