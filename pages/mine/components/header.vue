<template>
  <div
    :class="[
      'mine-header',
      'disabled',
      'background-color',
      realColorClass
    ]"
  >
    <van-image
      width="2.5rem"
      height="2.5rem"
      :src="value.avatar"
      round
      fit="fill"
      lazy-load
    />
    <div :class="[ 'mine-header-username', 'color', 'primary', realColorClass ]">
      {{value.username}}
    </div>
    <div class="mine-header-info">
      <div 
        v-for="item in info"
        :key="item.title"
        class="mine-header-info-content"
      >
        <span :class="['mine-header-info-content-data', 'thirdly', 'color', realColorClass]">{{item.value}}</span>
        <span :class="['mine-header-info-content-title', 'primary', 'color', realColorClass]">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import layoutMixin from '@/mixins/layout'
export default {
  mixins: [
    layoutMixin
  ],
  computed: {
    value() {
      return this.$store.state.user.userInfo || {}
    },
    info() {
      return [
        {
          value: this.value.fans,
          title: "粉丝"
        },
        {
          value: this.value.attentions,
          title: "人关注"
        },
        {
          value: this.value.hot,
          title: "人觉得很赞"
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
  @import url("/assets/global.less");
  .mine-header {
    padding: @normal-padding;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    &-username {
      font-size: @title-font-size;
      line-height: @normal-title-line-height;
    }
    &-info {
      font-size: @sub-title-font-size;
      display: flex;
      justify-content: space-between;
      width: 100%;
      &-content {
        &-data {
          font-weight: bold;
        }
      }
    }
  }
</style>