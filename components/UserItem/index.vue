<template>
  <van-swipe-cell>
    <van-cell>
      <template #title>
        <div
          class="user-item-title"
        >
          <van-image
            round
            width=".8rem"
            height=".8rem"
            :src="value.avatar"
          />
          <span class="user-item-title-text">{{value.username}}</span>
        </div>
      </template>
    </van-cell>
    <template v-if="needAction" #right>
      <van-button v-if="!!value.attention" class="action-button" square type="danger" text="取消关注" />
      <van-button v-else square class="action-button" type="primary" text="关注" />
    </template>
  </van-swipe-cell>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {
          isMine: false,
          username: "",
          avatar: null,
          description: ""
        }
      }
    },
    needAction: {
      type: Boolean,
      default: true 
    }
  }
}
</script>
<style lang="less" scoped>
  .user-item-title {
    display: flex;
    align-items: center;
    &-text {
      margin-left: 1em;
    }
  }
  .action-button {
    height: 100%;
    display: flex;
  }
</style>