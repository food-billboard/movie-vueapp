<template>
  <div 
    class="card-item"
    :style="{backgroundImage: `url(${value.poster})`}"
  >
    <div class="card-item-title">{{value.name}}</div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import url("/assets/global.less");
  .card-item {
    width: 100%;
    height: 100%;
    position: relative;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &-title {
      position: absolute;
      left: 1em;
      top: .5em;
      font-size: @normal-font-size;
      background-color: @normal-background;
      padding: 1px;
      border-radius: 1px;
    }
  }
</style>