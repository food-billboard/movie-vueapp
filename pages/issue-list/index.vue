<template>
  <div class="page-issue">
    <loading-list
      ref="loading-list"
      :fetch-data="fetchData"
    >
      <list-movie
        v-for="item in list"
        :key="item._id"
        :value="item"
        @refresh="handleClick"
      >
        <template v-if="isMine" #action>
          <color-icon name="edit" @click.stop="handleEdit(item)" />
        </template>
      </list-movie>
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
      return isMine ? this.$API_CUSTOMER.getSelfIssue : (isLogin ? this.$API_CUSTOMER.getUserIssue : this.$API_USER.getIssueList)
    },
    isMine() {
      return !!this.$route.query.isMine
    }
  },
  methods: {
    handleEdit(target) {
      const { _id } = target 
      this.$router.push({
        path: "/issue",
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
      if(init) this.list = []
      const { query: { id } } = this.$route
      const data = await this.fetchDataMethod({
        currPage,
        pageSize,
        _id: id,
        ...nextParams
      })
      const realValue = (Array.isArray(data) ? data : data.issue || [])
      this.list = realValue 
      return realValue 
    }
  },
}
</script>
<style lang="less" scoped>
  .page-issue {
    width: 100vw;
    min-height: 100vh;
  }
</style>