<template>
  <div class="page-store">
    <loading-list
      ref="loading-list"
      :fetch-data="fetchData"
    >
      <list-movie
        v-for="item in list"
        :key="item._id"
        :value="item"
        @refresh="handleClick"
      />
    </loading-list>
  </div>
</template>
<script>
import List from '@/components/List'
import ListMovie from '@/components/ListMovie'
export default {
  components: {
    LoadingList: List,
    ListMovie
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
      list: []
    }
  },
  computed: {
    fetchDataMethod() {
      const { query: { isMine } } = this.$route
      const isLogin = this.$isLogin(this)
      return isMine ? this.$API_CUSTOMER.getSelfStore : (isLogin ? this.$API_CUSTOMER.getUserStore : this.$API_USER.getStoreList)
    }
  },
  methods: {
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
      if(init) this.list = []
      const { query: { id, isMine } } = this.$route
      const data = await this.fetchDataMethod({
        currPage,
        pageSize,
        _id: id,
        ...nextParams
      })
      let realValue = (Array.isArray(data) ? data : data.store || [])
      if(isMine) realValue = realValue.map(item => ({ ...item, store: true }))
      this.list = realValue 
      return realValue 
    }
  },
}
</script>
<style lang="less" scoped>
  .page-store {
    width: 100vw;
    min-height: 100vh;
  }
</style>