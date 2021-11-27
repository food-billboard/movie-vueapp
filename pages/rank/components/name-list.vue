<template>
  <div 
    class="rank-list"
  >
    <div>
      <van-tag
        v-for="(item) in value"
        :key="item._id"
        :plain="active !== item._id"
        type="primary"
        class="rank-item"
        @click="handleGetDetail(item)"
      >
        {{item.name}}
      </van-tag>
    </div>
  </div>
</template>
<script>
import LayoutMixins from '@/mixins/layout'
export default {
  mixins: [
    LayoutMixins
  ],
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    active: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleGetDetail(target) {
      this.$emit("action", target)
    },
  },
}
</script>
<style lang="less" scoped>
  @import url("/assets/global.less");
  .rank-list {
    width: 100vw;
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;
    & > div {
      padding: .1rem 0;
    }
  }
  .rank-item {
    width: 20vw;
    display: inline-block;
    line-height: 2;
    text-align: center;
    font-size: @title-font-size;
    margin: 0 .1rem;
  }
</style>