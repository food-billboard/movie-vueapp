<template>
  <div class="page-attentions">
    <loading-list
      ref="loading-list"
      :fetch-data="fetchData"
      :refresh="handleClick"
    >
      <user-item
        v-for="item in userList"
        :key="item._id"
        :value="item"
      />
    </loading-list>
  </div>
</template>
<script>
import List from '@/components/List'
import UserItem from '@/components/UserItem'
export default {
  components: {
    LoadingList: List,
    UserItem
  },
  asyncData({ app, route, redirect }) {
    const { query: { isMine=false } }  = route
    const isLogin = !!app.store.state.user.userInfo
    if(isMine && !isLogin) {
      redirect({
        path: "/login"
      })
      return {}
    }
    return {}
  },
  data() {
    return {
      userList: []
    }
  },
  computed: {
    fetchDataMethod() {
      const { query: { isMine } } = this.$route
      const isLogin = this.$isLogin(this)
      return isMine ? this.$API_CUSTOMER.getSelfCustomer : (isLogin ? this.$API_CUSTOMER.getCustomerAttention : this.$API_USER.getAttentions)
    }
  },
  methods: {
    handleGetDetail(target) {
      const { _id } = target 
      this.$router.push({
        path: "/user",
        query: {
          id: _id 
        }
      })
    },
    async handleClick() {
      await this.$refs["loading-list"].onRefresh()
    },
    async fetchData({
      currPage,
      pageSize,
      init,
      ...nextParams 
    }={
      currPage: 0,
      pageSize: 10,
      init: false
    }) {
      if(init) this.userList = []
      const { query: { id, isMine } } = this.$route
      const data = await this.fetchDataMethod({
        currPage,
        pageSize,
        _id: id,
        ...nextParams
      })
      let realValue = (Array.isArray(data) ? data : data.attentions || [])
      if(isMine) realValue = realValue.map(item => ({ ...item, attention: true }))
      this.userList = realValue 
      return realValue 
    }
  },
}
</script>
<style lang="less" scoped>
  .page-attentions {
    width: 100vw;
    min-height: 100vh;
  }
</style>