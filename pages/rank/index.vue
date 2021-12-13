<template>
  <div style="height: 100vh">
    <rank-header
      :value="rankList"
    />
    <name-list
      :value="rankNameList"
      :active="currentRank"
      @action="handleClick"
    />
    <loading-list
      ref="loading-list"
      class="rank-list"
      :fetch-data="fetchData"
    >
      <list-item
        v-for="item in rankList"
        :key="item.id"
        :value="item"
        @refresh="handleClick.bind(this, currentRank)"
      />
    </loading-list>
  </div>
</template>
<script>
  import Header from './components/header'
  import NameList from './components/name-list.vue'
  import List from '@/components/List'
  import ListItem from '@/components/ListMovie'
  export default {
    components: {
      LoadingList: List,
      rankHeader: Header,
      NameList,
      ListItem
    },
    async asyncData({ app, route }) {
      const { query } = route
      const { id } = query 
      const rankNameList = await app.$API_USER.getRankNameList({ count: 20 })

      return {
        rankNameList,
        currentRank: id 
      }
    },
    data() {
      return {
        rankList: [],
        currentRank: "",
        rankNameList: []
      }
    },
    methods: {
      async handleClick(target) {
        const { _id } = target
        this.currentRank = _id 
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
        if(!this.currentRank) return []
        if(init) this.classify = []
        const data = await this.$API_USER.getRankList({
          currPage,
          pageSize,
          _id: this.currentRank,
          ...nextParams
        })
        this.rankList = data 
        return data 
      }
    },
  }
</script>
<style lang="less" scoped>
  .rank-list {
    margin-top: .2rem;
  }
</style>