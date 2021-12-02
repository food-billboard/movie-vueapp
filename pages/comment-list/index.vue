<template>
  <div class="page-comment-list">
    <van-sticky>
      <comment-header
        :value="movieData"
      />
    </van-sticky>
    <loading-list
      ref="loading-list"
      :fetch-data="fetchData"
    >
      <comment-item
        v-for="item in list"
        :key="item._id"
        :value="item"
        @refresh="handleClick"
      />
    </loading-list>
  </div>
</template>
<script>
import CommentHeader from './components/header.vue'
import LoadingList from '@/components/List'
import CommentItem from '@/components/CommentItem'
export default {
  components: {
    CommentHeader,
    LoadingList,
    CommentItem
  },
  async asyncData({ app, route }) {
    const { query: { id } } = route
    const movieData = await app.$API_USER.getMovieDetailSimple({ _id: id })
    return {
      movieData
    }
  },
  data() {
    return {
      movieData: {}
    }
  },
  computed: {
    fetchDataMethod() {
      const isLogin = this.$isLogin(this)
      return isLogin ? this.$API_CUSTOMER.getMovieComment : this.$API_USER.getMovieComment
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
      const realValue = (Array.isArray(data) ? data : data.comment || [])
      this.list = realValue 
      return realValue 
    }
  }
}
</script>
<style lang="less" scoped>
  .page-comment-list {
    width: 100%;
    min-height: 100vh;
  }
</style>