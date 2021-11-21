<template>
  <div style="height: 100vh">
    <classify-header
      :value="classifyNameList"
      :active="currentClassify"
      @action="handleClick"
    />
    <loading-list
      ref="loading-list"
      :fetch-data="fetchData"
    >
      <div
        v-for="item in classify"
        :key="item.id"
        style="height: 100px"
      >
        {{item.id}}
      </div>
    </loading-list>
  </div>
</template>
<script>
  import Header from './components/header'
  import List from '@/components/List'
  export default {
    components: {
      LoadingList: List,
      ClassifyHeader: Header
    },
    async asyncData({ app, route }) {
      const { query } = route
      const { id } = query 
      const classifyNameList = await app.$API_USER.getClassifyNameList()

      return {
        classifyNameList,
        currentClassify: id 
      }
    },
    data() {
      return {
        classifyNameList: [],
        classify: [],
        currentClassify: ""
      }
    },
    methods: {
      handleGetDetail(target) {
        const { _id } = target 
        this.$router.push({
          path: "/detail",
          query: {
            id: _id 
          }
        })
      },
      async handleClick(target) {
        const { _id } = target
        this.currentClassify = _id 
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
        if(!this.currentClassify) return 
        if(init) this.classify = []
        const data = await this.$API_USER.getClassifyList({
          currPage,
          pageSize,
          _id: this.currentClassify,
          ...nextParams
        })
        this.classify = data 
        return data 
      }
    },

  }
</script>