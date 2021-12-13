<template>
  <div class="setting-info">
    <van-cell-group>
      <van-cell 
        v-for="item in actionList"
        :key="item.title"
        :title="item.title" 
        is-link 
        @click="handleActionDetail(item)"
      >
        <template #icon>
          <color-icon :name="item.icon" class="setting-info-icon-setting" />
        </template>
      </van-cell>
    </van-cell-group>
    <color-setting />
    <loading-button
      type="danger"
      class="setting-info-button"
      :action="handleLogout"
    >
      退出登录
    </loading-button>
  </div>
</template>
<script>
import ColorSetting from './components/colorSetting.vue'
import LoadingButton from '@/components/LoadingButton'
export default {
  components: {
    LoadingButton,
    ColorSetting
  },
  async asyncData({ app }) {
    const appInfo = await app.$API_USER.getAppInfo()
    return {
      appInfo: appInfo.info
    }
  },
  data() {
    return {
      appInfo: ""
    }
  },
  computed: {
    actionList() {
      return [
        {
          title: "关于我们",
          icon: "label-o",
          action: this.handleGetAppInfo
        },
        {
          title: "反馈",
          icon: "bulb-o",
          action: this.handleFeedback
        },
        {
          title: "基础设置",
          icon: "user-circle-o",
          action: this.handleSetInfo
        }
      ]
    }
  },
  methods: {
    handleActionDetail(target) {
      const { action } = target
      action() 
    },
    handleGetAppInfo() {
      this.$dialog.alert({
        title: "关于",
        message: this.appInfo,
        confirmButtonText: "知道了"
      })
    },
    handleFeedback() {
      this.$router.push({
        path: "/feedback"
      })
    },
    handleSetInfo() {
      this.$router.push({
        path: "/base-setting"
      })
    },
    async handleLogout() {
      await this.$API_USER.logout()
    },
  },
}
</script>
<style lang="less" scoped>
@import url("/assets/global.less");
.setting-info {
  height: 100vh;
  position: relative;
  &-icon-setting {
    height: 24px;
    font-size: 0.416rem;
    line-height: 0.64rem;
    margin-right: 4px;
  }
  &-button {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>