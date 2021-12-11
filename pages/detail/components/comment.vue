<template>
  <div class="detail-comment-list">
    <div class="sub-title detail-comment-list-title">大家的意见</div>
    <div class="detail-comment-list-content">
      <div
        v-for="item in value"
        :key="item._id"
        class="detail-comment-list-content-item"
      >
        <van-popover
          v-model="item.show"
          trigger="click"
          theme="dark"
          placement="top"
        >
          <div class="detail-comment-list-content-item-text" @click="handleToComment">{{item.content.text}}</div>
          <template #reference>
            <van-image  
              width="100%"
              height="100%"
              round
              :src="item.user_info.avatar"
            />
          </template>
        </van-popover>
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
  },
  methods: {
    handleToComment() {
      this.$router.push({
        path: "/comment-list",
        query: {
          id: this.id 
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import url("/assets/global.less");
  .detail-comment-list {
    width: 100vw;
    &-title.sub-title {
      text-shadow: none;
      background-color: transparent;
      text-indent: @normal-padding;
    }
    &-content {
      width: 100%;
      overflow-x: auto;
      &-item {
        width: 15vw;
        height: 15vw;
        display: inline-block;
        &-text {
          padding: @normal-padding / 2;
          box-sizing: border-box;
          font-size: @normal-font-size;
          max-width: 15vw;
          word-break: break-all;
        }
      }
    }
  }
</style>