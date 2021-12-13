<template>
  <div class="source-view" @click.stop="handleGetDetail">
    <div class="source-view-content">
      {{sourceType}}: <i>{{renderData}}</i>
    </div>
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
  computed: {
    renderData() {
      return this.value.content ? this.value.content : "[ 媒体 ]"
    },
    sourceType() {
      return this.value.type === "movie" ? "电影" : "评论"
    }
  },
  methods: {
    handleGetDetail() {
      const { type, _id } = this.value 
      if(type === "movie") {
        this.$router.push({
          path: "/detail",
          query: {
            id: _id
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url("/assets/global.less");
  .source-view {
    width: 100%;
    font-size: @normal-font-size;
    padding: @normal-padding / 4;
    box-sizing: border-box;
    &-content {
      background-color: @normal-background;
      padding: @normal-padding / 4;
    }
  }
</style>