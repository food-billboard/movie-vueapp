<template>
  <div class="page-search">
    <search-input 
      @search="handleSearch"
    />
    <action-search 
      style="margin-top: 16px"
      :order-list="searchOrderList"
      :list-mode="listMode"
      @search="handleDetailSearch"
    />
    <search-list
      v-if="listMode === 'list'"
      ref="loading-list"
      :fetch-data="fetchData"
      :refresh="handleClick"
      :immediate-check="false"
    >
      <list-item
        v-for="item in searchList"
        :key="item.id"
        :value="item"
      />
    </search-list>
    <search-list
      v-if="listMode === 'card'"
      ref="loading-list"
      :fetch-data="fetchData"
      :refresh="handleClick"
      :immediate-check="false"
    >
      <card-item
        v-for="item in searchList"
        :key="item.id"
        :value="item"
      />
    </search-list>
  </div>
</template>
<script>
import ActionSearch from './components/action-search.vue'
import SearchInput from '@/components/Search'
import List from '@/components/List'
import ListItem from '@/components/ListMovie'
import CardItem from '@/components/CardMovie'
export default {
  components: {
    SearchInput,
    ActionSearch,
    SearchList: List,
    ListItem,
    CardItem
  },
  async asyncData({ app }) {
      const searchOrderList = await app.$API_USER.getSearchOrderList()

      return {
        searchOrderList,
      }
    },
    data() {
      return {
        searchList: [],
        listMode: "list",
        searchOrderList: []
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
      handleSearch(value) {
        if(!value) return 
        this.handleClick({
          content: value 
        })
      },
      handleDetailSearch(value) {
        const { listMode, ...nextValues } = value 
        if(listMode) this.listMode = listMode 
        if(Object.keys(nextValues).length) {
          this.handleClick(nextValues)
        }
      },
      async handleClick(params={}) {
        await this.$refs["loading-list"].onRefresh(params)
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
        if(init) this.classify = []
        const data = await this.$API_USER.getSearchList({
          currPage,
          pageSize,
          _id: this.currentRank,
          ...nextParams
        })
        this.searchList = data 
        return data 
      }
    },
}
</script>
<style lang="less" scoped>
  .page-search {
    min-height: 100vh;
  }
</style>