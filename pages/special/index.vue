<template>
  <div class="page-special">
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
  data() {
    return {
      list: []
    }
  },
  computed: {
    fetchDataMethod() {
      const { query: { isMine } } = this.$route
      const isLogin = this.$isLogin(this)
      return isMine ? this.$API_CUSTOMER.getSelfBrowser : (isLogin ? this.$API_CUSTOMER.getSpecialList : this.$API_USER.getSpecialList)
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
      const { query: { id } } = this.$route
      const data = await this.fetchDataMethod({
        currPage,
        pageSize,
        _id: id,
        ...nextParams
      })
      const realValue = data.movie 
      this.list = realValue 
      return realValue 
    }
  },
}
</script>
<style lang="less" scoped>
  .page-special {
    width: 100vw;
    min-height: 100vh;
  }
</style>