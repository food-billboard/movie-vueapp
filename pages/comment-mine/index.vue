<template>
  <div class="page-comment-mine">
    <loading-list
      ref="loading-list"
      :fetch-data="fetchData"
    >
      <comment-item
        v-for="item in list"
        :key="item._id"
        :value="item"
        :footer="false"
        :comment-self="false"
        @refresh="handleClick"
      >
        <template #footer>
          <source-view
            :value="item.source"
          />
        </template>
      </comment-item>
    </loading-list>
  </div>
</template>
<script>
import SourceView from './components/source.vue'
import LoadingList from '@/components/List'
import CommentItem from '@/components/CommentItem'
export default {
  components: {
    LoadingList,
    CommentItem,
    SourceView
  },
  data() {
    return {
      list: []
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
      const data = await this.$API_CUSTOMER.getSelfCommentList({
        currPage,
        pageSize,
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
  .page-comment-min {
    width: 100%;
    min-height: 100vh;
  }
</style>