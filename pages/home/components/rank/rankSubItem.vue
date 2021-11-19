<template>
  <div 
    class="rank-sub-item"
    :class="[{ 'rank-sub-item-active': !!value }, 'rank-sub-item']"
    :style="{backgroundImage: value ? `url(${value.poster})` : 'unset'}"
  >
  <van-tag
    v-if="!!value"
    type="primary"
    round
    plain
    class="rank-sub-item-title"
  >
    {{value.name}}
  </van-tag>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
}
</script>
<style lang="less" scoped>
  @import url("/assets/global.less");
  .rank-sub-item {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    &-title {
      margin-left: @normal-margin;
      border-radius: 5px;
    }
  }
  .rank-sub-item-active {
    box-shadow: 0 0 5px @normal-background;
  }
</style>