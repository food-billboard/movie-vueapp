<template>
  <div class="mine-info">
    <div class="mine-info-content">
      <div class="mine-info-content-main">
        <div
          v-for="(item, index) in mainAction"
          :key="item.title"
          :class="['mine-info-content-main-item', {
            'mine-info-content-main-item-active': index !== mainAction.length - 1
          }]"
          @click="handleActionDetail(item)"
        >
          <div>
            <van-icon :name="item.icon" class="mine-info-icon" />
            <div class="mine-info-text">{{item.title}}</div>
          </div>
        </div>
      </div>
      <div class="mine-info-content-main">
        <div
          v-for="(item) in subAction"
          :key="item.title"
          class="mine-info-content-main-item"
          @click="handleActionDetail(item)"
        >
          <div>
            <van-icon :name="item.icon" class="mine-info-icon" />
            <div class="mine-info-text">{{item.title}}</div>
          </div>
        </div>
      </div>
      <van-cell-group>
        <van-cell 
          v-for="item in setting"
          :key="item.title"
          :title="item.title" 
          is-link 
          @click="handleActionDetail(item)"
        >
          <template #icon>
            <van-icon :name="item.icon" class="mine-info-icon mine-info-icon-setting" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    value() {
      return this.$store.state.user.userInfo || {}
    },
    mainAction() {
      return [
        {
          title: "收藏",
          icon: "star",
          router: "/store"
        },
        {
          title: "发布",
          icon: "share",
          router: "/issue"
        }
      ]
    },
    subAction() {
      return [
        {
          title: "关注",
          icon: "like",
          router: "/attentions"
        },
        {
          title: "Wo的评论",
          icon: "comment",
          router: "/comment-mine"
        },
        {
          title: "浏览记录",
          icon: "todo-list",
          router: "/browser"
        },
        {
          title: "粉丝",
          icon: "friends",
          router: "/fans"
        },
      ]
    },
    setting() {
      return [
        {
          title: "Wo的发布",
          icon: "coupon",
          router: "/issue-list",
          query: {
            id: this.value._id 
          }
        },
        {
          title: "设置",
          icon: "setting",
          router: "/setting"
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
.mine-info {
  width: 100vw;
  box-sizing: border-box;
  padding: 0 @normal-padding * 2;
  &-content {
    width: 100%;
    background-color: @thirdly-background-color;
    border-radius: .2rem;
    overflow: hidden;
    // transform: translateY(@normal-margin * -1);
    &-main {
      display: flex;
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
          border-right: 1px solid @secondary-background-color;
        }
      }
    }
    &-sub {
      display: flex;
    }
    &-main,
    &-sub {
      border-bottom: 2px solid @secondary-background-color;
    }
  }
  &-icon {
    color: @secondary-background-color;
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