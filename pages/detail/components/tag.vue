<template>
  <div class="detail-tag-list">
    <div class="sub-title detail-tag-list-title">大家常说</div>
    <van-tag
      v-for="item in formatValue"
      :key="item.text"
      plain
      type="primary"
      class="detail-tag-list-item"
    >
      {{item.text}}
    </van-tag>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    formatValue() {
      return this.value.map(item => {
        const { text } = item
        return {
          origin: text,
          text: text.length > 20 ? text.slice(0, 20) + "..." : text 
        } 
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url("/assets/global.less");
  .detail-tag-list {
    width: 100vw;
    padding-left: @normal-padding;
    box-sizing: border-box;
    &-title {
      text-shadow: none;
      background-color: transparent;
      display: block;
    }
    &-item {
      margin-right: @normal-padding;
    }
  }
</style>