<template>
  <div class="page-user">
    <user-header
      :value="value"
    />
    <user-info 
      :value="value"
    />
    <loading-button
      class="page-user-button"
      type="info"
      round
      :action="handleClick"
    >
      {{buttonText}}
    </loading-button>
  </div>
</template>
<script>
import UserHeader from '../mine/components/header.vue'
import UserInfo from './components/info/index.vue'
import LoadingButton from '@/components/LoadingButton'
export default {
  components: {
    UserHeader,
    UserInfo,
    LoadingButton
  },
  async asyncData({ app, route, redirect }) {
    const { query: { id } } = route 
    const userInfo = app.store.state.user.userInfo
    const isLogin = !!userInfo
    let method 
    if(isLogin) {
      const { _id } = userInfo
      if(_id === id) {
        redirect({
          path: "/mine"
        })
        return {}
      }else {
        method = app.$API_CUSTOMER.getAnotherUserInfo
      }
    }else {
      method = app.$API_USER.getUserInfo
    }
    const result = await method({ _id: id })
    return {
      value: result 
    }
  },
  data() {
    return {
      value: {}
    }
  },
  computed: {
    buttonText() {
      return this.value.like ? "取消关注" : "关注"
    }
  },
  methods: {
    async handleClick() {
      await this.$confirm2Login(this, {
        async done() {
          const method = this.value.like ? this.$API_CUSTOMER.deleteUserAttention : this.$API_CUSTOMER.putUserAttention
          await method({ _id: this.value._id })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .page-user {
    width: 100vw;
    min-height: 100vh;
    position: relative;
    &-button {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  }
</style>