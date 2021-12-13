<template>
  <div v-if="loading" class="loading-class">
    <van-loading class="loading-class-item" type="spinner" >
      <slot></slot>
    </van-loading>
  </div>
</template>
<script>
export default {
  props: {
    loading: Boolean 
  },
}
</script>
<style lang="less" scoped>
  .loading-class {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    &-item {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
</style>
