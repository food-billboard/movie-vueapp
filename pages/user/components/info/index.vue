<template>
  <div class="user-info">
    <div :class="[ 'user-info-content', 'background-color', 'disabled', realColorClass ]">
      <van-cell-group>
        <van-cell 
          v-for="item in setting"
          :key="item.title"
          :title="item.title" 
          is-link 
          @click="handleActionDetail(item)"
        >
          <template #icon>
            <color-icon :name="item.icon" class="user-info-icon-setting" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import layoutMixin from '@/mixins/layout'
export default {
  mixins: [
    layoutMixin
  ],
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    setting() {
      return [
        {
          title: "收藏",
          icon: "star",
          router: "/store",
          query: {
            id: this.value._id  
          }
        },
        {
          title: "Ta的关注",
          icon: "like",
          router: "/attentions",
          query: {
            id: this.value._id 
          }
        },
        {
          title: "Ta的浏览记录",
          icon: "todo-list",
          router: "/browser",
          query: {
            id: this.value._id 
          }
        },
        {
          title: "Ta的粉丝",
          icon: "friends",
          router: "/fans",
          query: {
            id: this.value._id 
          }
        },
        {
          title: "Ta的发布",
          icon: "coupon",
          router: "/issue-list",
          query: {
            id: this.value._id 
          }
        },
      ]
    }
  },
  methods: {
    handleActionDetail(actionTarget) {
      const { router, query={}, params={} } = actionTarget
      this.$router.push({
        path: router,
        query,
        params
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url("/assets/global.less");
.user-info {
  width: 100vw;
  box-sizing: border-box;
  padding: 0 @normal-padding * 2;
  &-content {
    width: 100%;
    border-radius: .2rem;
    overflow: hidden;
    // transform: translateY(@normal-margin * -1);
    &-main {
      display: flex;
      border-bottom: 2px solid;
      &-item {
        flex: 1;
        padding: @normal-padding / 4 0;
        & > div {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
      &-item-active {
        & > div {
          border-right: 1px solid;
        }
      }
    }
  }
  &-icon-setting {
    height: 24px;
    font-size: 0.416rem;
    line-height: 0.64rem;
    margin-right: 4px;
  }
  &-text {
    font-size: @sub-title-font-size;
  }
}
</style>