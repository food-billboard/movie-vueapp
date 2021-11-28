<template>
  <div class="detail-comment-list">
    <div class="sub-title detail-comment-list-title">大家的意见</div>
    <div class="detail-comment-list-content">
      <div
        v-for="item in value"
        :key="item._id"
        class="detail-comment-list-content-item"
      >
        <van-image  
          width="100%"
          height="100%"
          round
          :src="item.user_info.avatar"
        />
      </div>
    </div>
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
    },
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showPopover: false 
    }
  }
}
</script>
<style lang="less" scoped>
  .detail-comment-list {
    width: 100vw;
    &-title {
      text-shadow: none;
      background-color: transparent;
    }
    &-content {
      width: 100%;
      overflow-x: auto;
      &-item {
        width: 20vw;
        height: 20vw;
      }
    }
  }
</style>